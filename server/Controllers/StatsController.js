'use strict'

// const ticket = require("../Models/Ticket");

// module.exports = {
//     newTicketRequest: function (req, res) {
//         console.log("Controller");
//         ticket.newTicket().then((ticket) => {
//             return res.status(200).json(pages);
//         }).catch((err) => {
//             return res.status(err.status).json({message: err.message}).end()
//         });
//     },
// };


const statsDAO = require('../Models/Stats');

module.exports = {
    getServiceTypeStats: async function(req, res) {
        try {
            const { timePeriod } = req.params; // 'day', 'week', 'month'
            const stats = await statsDAO.getServiceTypeStats(timePeriod);
            return res.status(200).json({ stats });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    },

    getCounterServiceStats: async function(req, res) {
        try {
            const { timePeriod } = req.params; // 'day', 'week', 'month'
            const stats = await statsDAO.getCounterServiceStats(timePeriod);
            return res.status(200).json({ stats });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    },
};
