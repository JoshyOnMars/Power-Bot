const mongoose = require("mongoose");

const serverSchema = new mongoose.Schema({
  serverID: { type: String },
  logChannel: { type: String, default: "none" },
  badWords: { type: Boolean, default: false },
  economy: { type: Boolean, default: false },
  prefix: { type: String, default: '.'},
});

const model = mongoose.model("ServerModels", serverSchema);

module.exports = model;
