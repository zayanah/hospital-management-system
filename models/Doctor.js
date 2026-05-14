// models/Doctor.js
const mongoose = require("mongoose");

const DoctorSchema = new mongoose.Schema({
  name:  { type: String, required: true, trim: true },
  spec:  { type: String, required: true },
  dept:  { type: String, required: true },
  phone: { type: String, required: true, match: /^\d{10}$/ },
  avail: { type: String, enum: ["Available","On leave","Off duty"], default: "Available" },
}, { timestamps: true });

module.exports = mongoose.model("Doctor", DoctorSchema);
