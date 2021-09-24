const mongoose = require("mongoose");

const orgSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  img: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  status: {
    type: [Number],
    default: [0, 0, 0],
  },
  crew: [mongoose.SchemaTypes.ObjectId],
});

const orgModel = mongoose.model("org", orgSchema);

module.exports = orgModel;
