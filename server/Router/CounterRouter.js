const express = require('express');
const counterRouter = express.Router();

const counterController = require('../Controllers/CounterController');

counterRouter.get('/services/getslist', counterController.serviceListRequest); //devo tenere l'url con services anche qui? come in ticket?

module.exports = counterRouter;