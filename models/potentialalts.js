const mongoose = require("mongoose");

const pAltsSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    username: String,
    userid: String,
})

module.exports = mongoose.model("potential_alts", pAltsSchema);