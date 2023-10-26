'use strict'

const statsDAO = require("../Models/Stats");

module.exports = {
    getServiceTypeStats: function(req, res) {

        const { timePeriod } = req.params; // 'day', 'week', 'month'
        statsDAO.getServiceTypeStats(timePeriod).then((stats) =>  {
            return res.status(200).json(stats);
        }).catch((err) => {
            return res.status(err.status).json({message: err.message}).end()
        });
    },

    getCounterServiceStats: function(req, res) {

        const { timePeriod } = req.params; // 'day', 'week', 'month'
        statsDAO.getCounterServiceStats(timePeriod).then((stats) =>  {
            
            return res.status(200).json(stats);
        }).catch((err) => {
            return res.status(err.status).json({message: err.message}).end()
        });
    },
};



