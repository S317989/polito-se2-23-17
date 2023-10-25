const express = require('express');
const counterRouter = express.Router();

const counterController = require('../Controllers/CounterController');

counterRouter.get('/services/getslist', counterController.serviceListRequest); //devo tenere l'url con services anche qui? come in ticket?

counterRouter.post('/services/newservice', counterController.newServiceRequest); 

counterRouter.put('/services/updateservice', counterController.updateServiceRequest); 

counterRouter.delete('/services/deleteservice', counterController.deleteServiceRequest); 

module.exports = counterRouter;

