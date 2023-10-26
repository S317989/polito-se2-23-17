"use strict";

const ticket = require("../Models/Ticket");

module.exports = {
  newTicketRequest: function (req, res) {
    let userPrivileges;    
    if (!req.isAuthenticated()) userPrivileges = undefined;
    else
      userPrivileges = {
        username: req.user.username,
        role: req.user.role,
        id: req.user.id,
      };

    ticket
      .newTicket(req.query.service, req.user.id)
      .then((ticket) => {
        return res.status(200).json(ticket);
      })
      .catch((err) => {
        return res.status(err.status).json({ message: err.message }).end();
      });
  },
  
  getServicesRequest: function (req, res) {
    ticket
      .getServices()
      .then((services) => {
        return res.status(200).json(services);
      })
      .catch((err) => {
        return res.status(err.status).json({ message: err.message }).end();
      });
  },

  callNext: function (req, res) {
    ticket.callNext(req, res);
  }
};
