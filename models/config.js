const mongoose = require("mongoose");

const guildConf = mongoose.Schema({
    _id: String,
    prefix: String,
    logchannel: String,
    greetingschannel: String,
    joinmsg: String,
    leavemsg: String,
    banmsg: Boolean,
    starboard: String,

})

module.exports = mongoose.model("gConf", guildConf);