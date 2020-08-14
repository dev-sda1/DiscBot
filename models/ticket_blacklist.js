const mongoose = require("mongoose");

const blacklistSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    username: String,
    userid: String,
    duration: String,
    reason: String,
    time: String
})

module.exports = mongoose.model("ticket_blacklist", blacklistSchema);