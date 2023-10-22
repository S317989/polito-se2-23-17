const express = require('express');
const apiRouter = express.Router();

apiRouter.use('/ticket', require('./TicketRouter'));

module.exports = apiRouter;