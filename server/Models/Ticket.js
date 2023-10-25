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
};
