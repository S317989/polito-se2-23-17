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


// module.exports = {
//     getServiceTypeStats: async function(req, res) {
//         try {
//             const { timePeriod } = req.params; // 'day', 'week', 'month'
//             const stats = await statsDAO.getServiceTypeStats(timePeriod);
//             return res.status(200).json({ stats });
//         } catch (error) {
//             return res.status(500).json({ message: error.message });
//         }
//     },

//     getCounterServiceStats: async function(req, res) {
//         try {
//             const { timePeriod } = req.params; // 'day', 'week', 'month'
//             const stats = await statsDAO.getCounterServiceStats(timePeriod);
//             return res.status(200).json({ stats });
//         } catch (error) {
//             return res.status(500).json({ message: error.message });
//         }
//     },
// };
