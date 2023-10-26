"use strict";

/**
 * DAO for Ticket table
 * */

const sqlite = require("sqlite3");

// Open the database connection
const db = new sqlite.Database("./QueueManagement.sqlite", (err) => {
  if (err) console.error(err.message);
  console.log("Ticket DAO ready.");
});

module.exports = {
  retrieveUserId(email, Password) {
    return new Promise(async (resolve, reject) => {
      let SQL = `SELECT Id FROM Users WHERE Email = ${email} AND Password = ${Password}`;
      db.run(SQL, (err, id) => {
        if (err) return reject(err);
        else return resolve(id);
      });
    });
  },
  getServiceIdByName(serviceName) {
    return new Promise(async (resolve, reject) => {
      let SQL = `SELECT Id FROM Services WHERE Name = "${serviceName}";`;

      db.all(SQL, (err, id) => {
        if (err) return reject(err);
        else return resolve(id[0].Id);
      });
    });
  },

  newTicket(selectedService, userId) {
    return new Promise(async (resolve, reject) => {
      let SQL = `INSERT INTO Tickets(DateTime, ServiceId, UserId, EstimatedWaitingTime, BeingServed, OfficerId, CounterId) 
                        VALUES (?, ?, ?, ?, ?, ?, ?)`;

      let dateTime = new Date().toISOString().slice(0, 19).replace("T", " ");

      let ServiceId = await this.getServiceIdByName(selectedService);

      let EWT = 1.5;

      let BeingServed = 0;

      console.log(userId);
      
      //let id = userId;


      let sqlCheck = "SELECT * FROM Users";

      db.all(sqlCheck, (err, rows) => {
        if (err) return reject(err);
        else {
          console.log(rows);
        }
      });
    });
  },

  getServices() {
    return new Promise((resolve, reject) => {
      let SQL = `SELECT * FROM Services`;

      db.all(SQL, (err, rows) => {
        if (err) return reject(err);
        else return resolve(rows);
      });
    });
  },

  callNext(req, res) {
    try {
      var date = (new Date()).toISOString();
      date = date.slice(0, 10);
      console.log(date);
      db.all(`SELECT T.Number, T.ServiceId
              FROM Tickets as T, Services as S, ServicesByCounters as SBC
              Where T.ServiceId = S.Id AND S.Id = SBC.ServiceId AND T.ServiceId = SBC.ServiceId
                    AND SBC.CounterId = ?
                    AND T.DateTime >= ?
                    AND T.OfficerId IS NULL
              GROUP BY T.ServiceId, S.AverageServiceTime, SBC.CounterId
              ORDER BY count(T.ServiceId) DESC, S.AverageServiceTime
              LIMIT 1`,
        [req.body.CounterId, date],
        (err, rows) => {
          if (err) return res.status(400).json(err);
          console.log(rows);
          db.run(`UPDATE Tickets
                  SET BeingServed = 0
                  WHERE ServiceId = ? AND BeingServed = 1`,
            [rows[0].ServiceId],
            (error) => {
              if (error) return res.status(400).json({ error, where: 'failed updating' });
              db.run(`UPDATE Tickets
                      SET BeingServed = 1, OfficerId = ?, CounterId = ?
                      WHERE Number = ? AND DateTime >= ?`,
                [req.body.OfficerId, req.body.CounterId, rows[0].Number, date],
                (error) => {
                  if (error) return res.status(400).json({ error, where: 'failed updating 2' });
                  return res.status(200).json({ Number: rows[0].Number, ServiceId: rows[0].ServiceId });
                });
            });
        });
    } catch (error) {
      return res.status(400).json(error);
    }
  },
};
