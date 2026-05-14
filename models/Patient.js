// models/Patient.js
const mongoose = require("mongoose");

const PatientSchema = new mongoose.Schema({
  name:      { type: String, required: true, trim: true },
  age:       { type: Number, required: true, min: 1, max: 120 },
  gender:    { type: String, enum: ["Male", "Female", "Other"], default: "Male" },
  blood:     { type: String, enum: ["A+","A-","B+","B-","AB+","AB-","O+","O-"], default: "O+" },
  phone:     { type: String, required: true, match: /^\d{10}$/ },
  condition: { type: String, enum: ["Stable","Critical","Recovering","Admitted"], default: "Stable" },
}, { timestamps: true });

module.exports = mongoose.model("Patient", PatientSchema);
