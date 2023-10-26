"use strict";

/**
 * DAO for Stats table
 * */

const sqlite = require("sqlite3");
const dayjs = require('dayjs'); 

// Open the database connection
const db = new sqlite.Database("./QueueManagement.sqlite", (err) => {
  if (err) console.error(err.message);
  console.log("Stats DAO ready.");
});

module.exports = {
    getServiceTypeStats: function(timePeriod) {
        return new Promise((resolve, reject) => {
            let startDate, endDate;

            if (timePeriod === 'day') {
                startDate = dayjs().subtract(1, 'day').startOf('day').toDate();
                endDate = dayjs().endOf('day').toDate();
            } else if (timePeriod === 'week') {
                startDate = dayjs().subtract(1, 'week').startOf('week').toDate();
                endDate = dayjs().endOf('week').toDate();
            } else if (timePeriod === 'month') {
                startDate = dayjs().subtract(1, 'month').startOf('month').toDate();
                endDate = dayjs().endOf('month').toDate();
            } else {
                reject(new Error('Invalid time period'));
                return; // Make sure to return here to avoid executing the rest of the code
            }

            const sql = `
                SELECT 
                    Services.Name AS serviceName,
                    COUNT(Tickets.Number) AS totalServed
                FROM 
                    Tickets
                INNER JOIN 
                    Services ON Tickets.ServiceId = Services.Id
                WHERE 
                    Tickets.DateTime BETWEEN ? AND ?
                    AND Tickets.BeingServed = 0  
                GROUP BY 
                    Services.Name
            `;

            db.all(sql, [startDate, endDate], (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                    console.log(rows);
                }
            });
        });
    },

    getCounterServiceStats: function(timePeriod) {
        return new Promise((resolve, reject) => {
            let startDate, endDate;

            if (timePeriod === 'day') {
                startDate = dayjs().subtract(1, 'day').startOf('day').toDate();
                endDate = dayjs().endOf('day').toDate();
            } else if (timePeriod === 'week') {
                startDate = dayjs().subtract(1, 'week').startOf('week').toDate();
                endDate = dayjs().endOf('week').toDate();
            } else if (timePeriod === 'month') {
                startDate = dayjs().subtract(1, 'month').startOf('month').toDate();
                endDate = dayjs().subtract(1, 'month').endOf('month').toDate();                
            } else {
                reject(new Error('Invalid time period'));
                return;
            }

            const sql = `
                SELECT
                    Counters.Name AS counterName,
                    Services.Name AS serviceName,
                    COUNT(Tickets.Number) AS totalServed
                FROM
                    Tickets
                INNER JOIN
                    Counters ON Tickets.CounterId = Counters.Id
                INNER JOIN
                    Services ON Tickets.ServiceId = Services.Id
                WHERE
                    Tickets.DateTime BETWEEN ? AND ?
                    AND Tickets.BeingServed = 0 
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


