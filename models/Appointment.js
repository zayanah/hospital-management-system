// models/Appointment.js
const mongoose = require("mongoose");

const AppointmentSchema = new mongoose.Schema({
  patientId: { type: mongoose.Schema.Types.ObjectId, ref: "Patient", required: true },
  doctorId:  { type: mongoose.Schema.Types.ObjectId, ref: "Doctor",  required: true },
  date:      { type: String, required: true },
  time:      { type: String, required: true },
  type:      { type: String, enum: ["Consultation","Follow-up","Emergency","Surgery","Lab Test"], default: "Consultation" },
  status:    { type: String, enum: ["scheduled","completed","cancelled"], default: "scheduled" },
  notes:     { type: String, default: "" },
}, { timestamps: true });

module.exports = mongoose.model("Appointment", AppointmentSchema);
