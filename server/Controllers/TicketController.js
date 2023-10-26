'use strict'

const ticket = require("../Models/Ticket");


module.exports = {
    newTicketRequest: function (req, res) {
        ticket.newTicket().then((ticket) => {
            return res.status(200).json(pages);
        }).catch((err) => {
            return res.status(err.status).json({message: err.message}).end()
        });
    },

    callNext: function (req, res){
        ticket.callNext(req, res);
    }
};