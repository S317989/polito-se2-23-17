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
        console.log("DOne");
        if (err) return reject(err);
        else return resolve(id);
      });
    });
  },

  newTicket() {
    return new Promise(async (resolve, reject) => {
      let SQL = `INSERT INTO Tickets(DateTime, ServiceId, UserId, EstimatedWaitingTime, BeingServed, OfficerId, CounterId) 
                        VALUES (?, ?, ?, ?, ?, ?, ?)`;

      let dateTime = new Date().toISOString().slice(0, 19).replace("T", " ");

      //let ServiceId = serviceId;

      let EWT = 1.5;

      let BeingServed = 0;

      //let userId = await this.retrieveUserId("", );

      let sqlCheck = "SELECT * FROM Users";

      db.all(sqlCheck, (err, rows) => {
        if (err) return reject(err);
        else {
          console.log(rows);
        }
      })
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
        [req.body.counterId, date],
        (err, rows) => {
          if (err) return res.status(400).json(err);
          return res.status(200).json(rows.map(r => Object.assign({}, { Number: r.Number, ServiceId: r.ServiceId })));
        });
    } catch (error) {
      return res.status(400).json(error);
    }
  },
};
