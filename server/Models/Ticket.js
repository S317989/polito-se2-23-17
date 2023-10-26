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

  getServiceInfosByName(serviceName) {
    return new Promise(async (resolve, reject) => {
      let SQL = `SELECT * FROM Services WHERE Name = "${serviceName}";`;

      db.all(SQL, (err, id) => {
        if (err) return reject(err);
        else return resolve(id[0]);
      });
    });
  },

  retrieveUserInQueue(serviceId) {
    return new Promise(async (resolve, reject) => {
      let SQL = `SELECT COUNT(*) AS Num FROM Tickets WHERE ServiceId = ${serviceId} AND BeingServed = 0;`;

      db.all(SQL, (err, id) => {
        if (err) return reject(err);
        else return resolve(id[0]);
      });
    });
  },

  retrieveCounterNum() {
    return new Promise(async (resolve, reject) => {
      let SQL = `SELECT COUNT(*) AS Num FROM Counters;`;

      db.all(SQL, (err, id) => {
        if (err) return reject(err);
        else return resolve(id[0]);
      });
    });
  },

  retrieveCounterInfo(counterId) {
    return new Promise(async (resolve, reject) => {
      let SQL = `SELECT COUNT(*) as reqServed FROM ServicesByCounters WHERE CounterId = ${counterId};`;

      db.all(SQL, (err, id) => {
        if (err) return reject(err);
        else return resolve(id[0]);
      });
    });
  },

  checkCounterService(counterId, serviceId) {
    return new Promise(async (resolve, reject) => {
      let SQL = `SELECT * FROM ServicesByCounters WHERE CounterId = ${counterId} AND ServiceId = ${serviceId};`;

    
      db.all(SQL, (err, id) => {
        if (err) return reject(err);
        else return resolve(id.length === 0 ? 0 : 1);
      });
    });
  },

  async calculateEWT(ServiceInfo) {
    let tr = ServiceInfo.AverageServiceTime; 
    let nr = await this.retrieveUserInQueue(ServiceInfo.Id);

    let counterNum = await this.retrieveCounterNum();
    let k = 0.0;

    for(let i = 0; i < counterNum.Num; i++) {
      let counterInfo = await this.retrieveCounterInfo(i);
      let counterService = await this.checkCounterService(i, ServiceInfo.Id);

      if(counterInfo.reqServed === 0 && counterService === 0) k += 0.0;
      else k += ((1 / counterInfo.reqServed) * counterService);
    }

    return tr * ((nr.Num / k) + 0.5);
  },

  checkLastTicket() {
    return new Promise(async (resolve, reject) => {
      let SQL = `SELECT COUNT(*) as Num FROM Tickets;`;

      db.all(SQL, (err, id) => {
        if (err) return reject(err);
        else return resolve(id[0]);
      });
    });
  },

  newTicket(selectedService, userId) {
    return new Promise(async (resolve, reject) => {
      let SQL = `INSERT INTO Tickets(Number, DateTime, ServiceId, UserId, EstimatedWaitingTime) 
                        VALUES (?, ?, ?, ?, ?)`;

      let dateTime = new Date().toISOString().slice(0, 19).replace("T", " ");

      let ServiceInfo = await this.getServiceInfosByName(selectedService);

      let EWT = await this.calculateEWT(ServiceInfo);

      let ticketNum = await this.checkLastTicket();

      db.run(SQL, [ticketNum.Num + 1, dateTime, ServiceInfo.Id, userId, EWT], function (err) {
        if (err) return reject(err);
        else return resolve({status: 200, ticket: this.lastID, message: 'Ticket created successfully'});
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
