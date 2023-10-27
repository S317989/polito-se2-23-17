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
            
            const format = 'YYYY-MM-DD HH:mm:ss';
            const endDate = dayjs().format(format);
            let startDate;

            if (timePeriod === 'day') {
                startDate = dayjs().subtract(1, 'day').format(format);
            } else if (timePeriod === 'week') {
                startDate = dayjs().subtract(1, 'week').format(format);
            } else if (timePeriod === 'month') {
                startDate = dayjs().subtract(1, 'month').format(format);
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
                    Tickets.DateTime > ? AND Tickets.DateTime < ?
                    AND Tickets.CounterId IS NOT NULL
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

            const format = 'YYYY-MM-DD HH:mm:ss';
            const endDate = dayjs().format(format);
            let startDate;

            if (timePeriod === 'day') {
                startDate = dayjs().subtract(1, 'day').format(format);
            } else if (timePeriod === 'week') {
                startDate = dayjs().subtract(1, 'week').format(format);
            } else if (timePeriod === 'month') {
                startDate = dayjs().subtract(1, 'month').format(format);
            } else {
                reject(new Error('Invalid time period'));
                return; // Make sure to return here to avoid executing the rest of the code
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
                    Tickets.DateTime > ? AND Tickets.DateTime < ?
                    AND Tickets.CounterId IS NOT NULL
                GROUP BY
                    Counters.Name, Services.Name
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
    }
};


