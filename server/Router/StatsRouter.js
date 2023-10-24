// const express = require('express');
// const ticketRouter = express.Router();

// const ticketController = require('../Controllers/TicketController');

// ticketRouter.post('/new-ticket', ticketController.newTicketRequest);

// module.exports = ticketRouter;



const express = require('express');
const statsRouter = express.Router();
const statsController = require('../Controllers/StatsController');

// Get service type stats for a specific time period
statsRouter.get('/service-type/:timePeriod', statsController.getServiceTypeStats);

// Get counter service stats for a specific time period
statsRouter.get('/counter-service/:timePeriod', statsController.getCounterServiceStats);

module.exports = statsRouter;
