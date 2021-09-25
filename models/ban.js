const mongoose = require("mongoose");

const BanSchema = new mongoose.Schema(
  {
    bannedUser: String
  }
)

module.exports = mongoose.model("Ban", BanSchema);