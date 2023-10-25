"use strict";

/**
 * DAO for User table
 * */

const sqlite = require("sqlite3");
const bcrypt = require("bcrypt");

// Open the database connection
const db = new sqlite.Database("./QueueManagement.sqlite", (err) => {
  if (err) console.error(err.message);
  console.log("User DAO ready.");
});

module.exports = {
  authentication: function (username, password) {
    return new Promise((resolve, reject) => {
      const sql = "SELECT * FROM User WHERE username = ?";
      db.get(sql, [username], (err, row) => {
        if (err)
          reject({
            status: 500,
            message: "Internal Server Error",
          });

        if (row === undefined)
          reject({ status: 404, message: "User not found" });
        else {
          const user = {
            id: row.id,
            name: row.name,
            email: row.email,
            role: row.role,
            salt: row.salt,
          };

          bcrypt.hash(password, user.salt, (err, hashedPassword) => {
            if (err)
              return reject({ status: 500, message: "Internal Server Error" });

            if (hashedPassword === row.password) resolve(user);
            else reject({ status: 401, message: "Unauthorized" });
          });
        }
      });
    });
  },
};
