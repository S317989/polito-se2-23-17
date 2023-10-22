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
    newTicket(){
        console.log("DAO");
        return new Promise((resolve, reject) => {
            console.log("Inside"); 
        });
    },
};
