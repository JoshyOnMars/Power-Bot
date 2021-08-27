const mongoose = require("mongoose");

const serverSchema = new mongoose.Schema({
  serverID: { type: String, require: true },
  logChannel: { type: String, unique: true },
  badWords: { type: Boolean, default: false },
  economy: { type: Boolean, default: false },
  prefix: { type: String, default: '.'},
});

const model = mongoose.model("ServerModels", serverSchema);

module.exports = model;
