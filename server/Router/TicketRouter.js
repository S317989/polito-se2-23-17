const express = require('express');
const ticketRouter = express.Router();

const ticketController = require('../Controllers/TicketController');

ticketRouter.post('/new-ticket', ticketController.newTicketRequest);

ticketRouter.get("/get-services", ticketController.getServicesRequest);

module.exports = ticketRouter;