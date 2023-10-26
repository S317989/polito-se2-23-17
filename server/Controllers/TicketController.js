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

    console.log(userPrivileges);

    ticket
      .newTicket(req.query.service, req.user.Id)
      .then((ticket) => {
        return res.status(200).json(pages);
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
};
