const mongoose = require("mongoose");

const warnSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    username: String,
    userid: String,
    reason: String,
    modname: String,
    modid: String,
    time: String
})

module.exports = mongoose.model("warn", warnSchema);