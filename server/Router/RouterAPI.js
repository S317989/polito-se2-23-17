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

apiRouter.use('/stats', require('./StatsRouter'));

apiRouter.use('/services', require('./CounterRouter'));


module.exports = apiRouter;
