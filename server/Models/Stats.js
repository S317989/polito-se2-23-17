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


// const sqlite3 = require('sqlite3').verbose();

// const db = new sqlite3.Database('./QueueManagement.sqlite');


// module.exports = {
//     newTicket(){
//         console.log("DAO");
//         return new Promise((resolve, reject) => {
//             console.log("Inside"); 
//         });
//     },
// };

module.exports = {
    getServiceTypeStats: function(timePeriod) {
        return new Promise((resolve, reject) => {
            const startDate = new Date();
            if (timePeriod === 'day') {
                startDate.setDate(startDate.getDate() - 1);
            } else if (timePeriod === 'week') {
                startDate.setDate(startDate.getDate() - 7);
            } else if (timePeriod === 'month') {
                startDate.setMonth(startDate.getMonth() - 1);
            }

            const endDate = new Date();

            const sql = `
                SELECT 
                    Services.Name AS serviceName,
                    COUNT(Tickets.Number) AS totalServed,
                    COUNT(DISTINCT Tickets.ServiceId) AS uniqueServices
                FROM 
                    Tickets
                INNER JOIN 
                    Services ON Tickets.ServiceId = Services.Id
                WHERE 
                    Tickets.DateTime BETWEEN ? AND ?
                    AND Tickets.BeingServed = 1  
                GROUP BY 
                    Services.Name
            `;

            db.all(sql, [startDate, endDate], (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
    }
};


module.exports = {
    getCounterServiceStats: function() {
        return new Promise((resolve, reject) => {

            const startDate = new Date();
            if (timePeriod === 'day') {
                startDate.setDate(startDate.getDate() - 1);
            } else if (timePeriod === 'week') {
                startDate.setDate(startDate.getDate() - 7);
            } else if (timePeriod === 'month') {
                startDate.setMonth(startDate.getMonth() - 1);
            }

            const endDate = new Date();

            const sql = `
                SELECT
                    Counters.Name AS counterName,
                    Services.Name AS serviceName,
                    COUNT(Tickets.number) AS totalServed
                FROM
                    Tickets
                INNER JOIN
                    Counters ON Tickets.CounterId = Counters.Id
                INNER JOIN
                    Services ON Tickets.ServiceId = Services.Id
                GROUP BY
                    Counters.Name, Services.Name
            `;

           db.all(sql, [startDate, endDate], (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
    }
};






