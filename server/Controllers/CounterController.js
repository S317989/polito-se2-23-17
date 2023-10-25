'use strict'

const service = require("../Models/Counters");


module.exports = {
    serviceListRequest: function (req, res) {
        console.log("Controller");
        service.getListServices().then((service) => {
            return res.status(200).json(pages);
        }).catch((err) => {
            return res.status(err.status).json({message: err.message}).end()
        });
    },
};
