const mongoose = require("mongoose");

const ticketSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    username: String,
    userid: String,
    ticketid: String,
    ticket_type: String,
    message: String,
    closed: Boolean,
    time: String
})

module.exports = mongoose.model("tickets", ticketSchema);