const express = require('express');
const apiRouter = express.Router();

apiRouter.use('/ticket', require('./TicketRouter'));

apiRouter.use('/getslist', require('./CounterRouter'));

module.exports = apiRouter;
