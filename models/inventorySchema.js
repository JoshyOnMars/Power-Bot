const mongoose = require("mongoose");

const inventorySchema = new mongoose.Schema({
  guildID: String,
  userID: String,
  inventory: Object,
});

const model = mongoose.model("Inventory", inventorySchema);

module.exports = model;
