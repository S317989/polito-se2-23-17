'use strict'

const service = require("../Models/Counters");


module.exports = {
    serviceListRequest: function (req, res) {
        console.log("Controller");
        service.getListServices().then((service) => {
            return res.status(200).json(service); //service, cos'è pages?
        }).catch((err) => {
            return res.status(err.status).json({message: err.message}).end()
        });
    },
    newServiceRequest: function (req, res) {
        console.log("Controller");
        service.addService(req.body.name, req.body.ast).then((service) => {

            return res.status(200).json(service);
        }).catch((err) => {
            return res.status(err.status).json({message: err.message}).end()
        });
    },
    updateServiceRequest: function (req, res) {
        console.log("Controller");
        service.updateService(req.body.ast).then((service) => {

            return res.status(200).json(service);
        }).catch((err) => {
            return res.status(err.status).json({message: err.message}).end()
        });
    },

    deleteServiceRequest: function (req, res) {
        console.log("Controller");
        service.deleteService(req.body.id).then((service) => {

            return res.status(200).json(service);
        }).catch((err) => {
            return res.status(err.status).json({message: err.message}).end()
        });
    },
    serviceListByCounterRequest: function (req, res) {
        console.log("Controller");
        service.getServiceByCounter(req.params.counterId).then((service) => {
            return res.status(200).json(service); //service, cos'è pages?
        }).catch((err) => {
            return res.status(err.status).json({message: err.message}).end()
        });
    },
    newServiceByCounterRequest: function (req, res) {
        console.log("Controller");
        service.addServiceByCounter(req.params.serviceId, req.params.counterId).then((service) => {

            return res.status(200).json(service);
        }).catch((err) => {
            return res.status(err.status).json({message: err.message}).end()
        });
    },
    deleteServiceByCounterRequest: function (req, res) {
        console.log("Controller");
        service.deleteServiceByCounter(req.params.counterId, req.params.serviceId).then((service) => {

            return res.status(200).json(service);
        }).catch((err) => {
            return res.status(err.status).json({message: err.message}).end()
        });
    },
};
