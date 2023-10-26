const express = require('express');
const ticketRouter = express.Router();

const ticketController = require('../Controllers/TicketController');

ticketRouter.post('/new-ticket', ticketController.newTicketRequest);
ticketRouter.post('/callNext', ticketController.callNext);

module.exports = ticketRouter;