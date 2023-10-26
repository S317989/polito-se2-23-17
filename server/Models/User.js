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
  authentication: function (email, password) {
    return new Promise((resolve, reject) => {
      const sql = "SELECT * FROM Users WHERE Email = ?";
      db.get(sql, [email], (err, row) => {
        if (err)
          reject({
            status: 500,
            message: "Internal Server Error",
          });

        if (row === undefined)
          reject({ status: 404, message: "User not found" });
        else {
          const user = {
            id: row.Id,
            name: row.Name,
            email: row.Email,
            role: row.Role,
            salt: row.Salt,
          };

          bcrypt.hash(password, 10).then((hash) => {
            bcrypt
              .compare(password, hash)
              .then((res) => {
                resolve(user);
              })
              .catch((err) => console.error(err.message));
          });
        }
      });
    });
  },
  getUserById: function (id) {
    return new Promise((resolve, reject) => {
      const sql = "SELECT * FROM Users WHERE id = ?";
      try {
        db.get(sql, [id], (err, row) => {
          if (err)
            return reject({
              status: 500,
              message: "Internal Server Error",
            });

            if (row === undefined)
            return reject({ status: 404, message: "User not found" });
          else
            return resolve({
              id: row.Id,
              email: row.Email,
              role: row.Role,
            });
        });
      } catch (e) {
        return reject({ status: 500, message: "Author not found" });
      }
    });
  },
};
