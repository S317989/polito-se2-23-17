const express = require('express');
const counterRouter = express.Router();

const counterController = require('../Controllers/CounterController');

counterRouter.get('/getslist', counterController.serviceListRequest); //devo tenere l'url con services anche qui? come in ticket?

counterRouter.post('/newservice', counterController.newServiceRequest); 

counterRouter.put('/updateservice', counterController.updateServiceRequest); 

counterRouter.delete('/deleteservice', counterController.deleteServiceRequest); 

counterRouter.get('/:counterId', counterController.serviceListByCounterRequest); //devo tenere l'url con services anche qui? come in ticket?

counterRouter.post('/:counterId/:serviceId', counterController.newServiceByCounterRequest); 

counterRouter.delete('/:counterId/:serviceId', counterController.deleteServiceByCounterRequest); 

module.exports = counterRouter;

