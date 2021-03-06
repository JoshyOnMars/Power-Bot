const mongoose = require("mongoose");

const moneySchema = new mongoose.Schema({
  userID: { type: String, require: true, unique: true },
  coins: { type: Number, default: 1000 },
  bank: { type: Number, default: 0 },
});

const model = mongoose.model("Money", moneySchema);

module.exports = model;
