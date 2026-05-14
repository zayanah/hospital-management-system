const mongoose = require("mongoose");

const ConfigSchema = new mongoose.Schema({
  seniorAge: { type: Number, default: 60 },
  discountPercent: { type: Number, default: 10 }
}, { timestamps: true });

module.exports = mongoose.model("Config", ConfigSchema);