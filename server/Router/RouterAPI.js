const express = require('express');
const apiRouter = express.Router();

apiRouter.use('/ticket', require('./TicketRouter'));

apiRouter.use('/services/getslist', require('./CounterRouter'));
apiRouter.use('/services/newservice', require('./CounterRouter'));
apiRouter.use('/services/updateservice', require('./CounterRouter'));
apiRouter.use('/services/deleteservice', require('./CounterRouter'));

apiRouter.use('/services/:counterId', require('./CounterRouter'));
apiRouter.use('/services/:counterId/:serviceId', require('./CounterRouter'));

module.exports = apiRouter;
