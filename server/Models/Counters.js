'use strict';
/* Data Access Object (DAO) module for accessing questions and answers */

const sqlite = require('sqlite3');
const crypto = require('crypto');
const dayjs = require('dayjs');

// open the database
const db = new sqlite.Database('QueueManagement.sqlite', (err) => { //file .sqlite ?
  if(err) throw err;
});

// get all services
exports.getListServices = () => {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT * FROM Services';
      db.all(sql, [], (err, rows) => {
        if (err) {
          reject(err);
          return;
        }
        const services = rows.map((e) => ({ id: e.Id, name: e.Name, ast: e.AverageServiceTime }));
        resolve(services);
      });
    });
  };

    // create new service
exports.addService = (name, ast) => {
  
    return new Promise((resolve, reject) => {
      const sql = 'INSERT INTO Services(Name, AverageServiceTime) VALUES(?, ?)';  
      // 
      db.run(sql, [name, ast], function (err) {
        if (err) {
          reject(err);
          return;
        }
        resolve(this.lastID); //returns last id element
      });
    });
  };

      // update a given service
exports.updateService = (id, ast) => {
  
    return new Promise((resolve, reject) => {
      const sql = 'UPDATE Services SET AverageServiceTime=? WHERE id = ?';  
      // 
      db.run(sql, [ast, id], function (err) {
        if (err) {
          reject(err);
          return;
        }
        resolve(this.changes); //returns number of rows modified
      });
    });
  };

   //delete a Service
   exports.deleteService = (id) => {
    return new Promise((resolve, reject) => {
      const sql = 'DELETE FROM Services WHERE id = ?';  
      db.run(sql, [id], function (err) {
        if (err) {
          reject(err);
          return;
        } else
          resolve(this.changes);  // return the number of affected rows
      });
    });
  } ; 

  // ### manage services for a given counter ###
  // get all services
exports.getServiceByCounter = (counterId) => {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM ServicesByCounters JOIN Services ON Services.Id=ServicesByCounters.ServiceId WHERE CounterId=?';
    db.all(sql, [counterId], (err, rows) => {
      if (err) {
        reject(err);
        return;
      }
      const services = rows.map((e) => ({ id: e.Id, name: e.Name, ast: e.AverageServiceTime }));
      resolve(services);
    });
  });
};

//add service for a given counter
exports.addServiceByCounter = (serviceId, counterId) => {
  
  return new Promise((resolve, reject) => {
    const sql = 'INSERT INTO ServicesByCounters(ServiceId, CounterId) VALUES(?, ?)';  
    // 
    db.run(sql, [serviceId, counterId], function (err) {
      if (err) {
        reject(err);
        return;
      }
      resolve(this.lastID); //returns last id element
    });
  });
};
      
   //delete a Service for a given counter
   exports.deleteServiceByCounter = (counterId, serviceId) => {
    return new Promise((resolve, reject) => {
      const sql = 'DELETE FROM ServicesByCounters WHERE CounterId = ? AND ServiceId = ?';  
      db.run(sql, [counterId, serviceId], function (err) {
        if (err) {
          reject(err);
          return;
        } else
          resolve(this.changes);  // return the number of affected rows
      });
    });
  } ; 
