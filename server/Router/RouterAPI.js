<<<<<<< HEAD
const express = require("express");
const apiRouter = express.Router();

apiRouter.use("/ticket", require("./TicketRouter"));
apiRouter.use("/auth", require("./RouterAuth"));

// All the routes will be protected by the checkAuthentication middleware
const checkAuthentication = (req, res, next) => {
  req.isAuthenticated()
    ? next()
    : res.status(401).json({ errorMessage: "Unauthorized" });
};

apiRouter.use((req, res, next) => {
  checkAuthentication(req, res, next);
});
=======
const express = require('express');
const apiRouter = express.Router();

apiRouter.use('/ticket', require('./TicketRouter'));

apiRouter.use('/services/getslist', require('./CounterRouter'));
apiRouter.use('/services/newservice', require('./CounterRouter'));
apiRouter.use('/services/updateservice', require('./CounterRouter'));
apiRouter.use('/services/deleteservice', require('./CounterRouter'));

apiRouter.use('/services/:counterId', require('./CounterRouter'));
apiRouter.use('/services/:counterId/:serviceId', require('./CounterRouter'));
>>>>>>> ConfigureCounters-backend

module.exports = apiRouter;
