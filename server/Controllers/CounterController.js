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
};

module.exports = {
    newServiceRequest: function (req, res) {
        console.log("Controller");
        service.addService(req.body.name, req.body.ast).then((service) => {

            return res.status(200).json(service);
        }).catch((err) => {
            return res.status(err.status).json({message: err.message}).end()
        });
    },
};

module.exports = {
    updateServiceRequest: function (req, res) {
        console.log("Controller");
        service.updateService(req.body.ast).then((service) => {

            return res.status(200).json(service);
        }).catch((err) => {
            return res.status(err.status).json({message: err.message}).end()
        });
    },
};

module.exports = {
    deleteServiceRequest: function (req, res) {
        console.log("Controller");
        service.deleteService(req.body.id).then((service) => {

            return res.status(200).json(service);
        }).catch((err) => {
            return res.status(err.status).json({message: err.message}).end()
        });
    },
};