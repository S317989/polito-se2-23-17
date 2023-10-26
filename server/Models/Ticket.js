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
};
