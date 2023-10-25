const express = require('express');
const apiRouter = express.Router();

apiRouter.use('/ticket', require('./TicketRouter'));
apiRouter.use('/auth', require('./RouterAuth'));

module.exports = apiRouter;