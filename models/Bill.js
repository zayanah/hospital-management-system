const mongoose = require("mongoose");
const Patient = require("./Patient");
const Config = require("./Config"); // import config

const BillSchema = new mongoose.Schema({
  patientId: { type: mongoose.Schema.Types.ObjectId, ref: "Patient", required: true },
  service:   { type: String, required: true },
  amount:    { type: Number, required: true, min: 1 },

  discount:  { type: Number, default: 0 },
  finalAmount: { type: Number },

  date:      { type: String, required: true },
  status:    { type: String, enum: ["paid","pending","overdue"], default: "pending" },
}, { timestamps: true });


// 🔥 Dynamic Discount Logic
BillSchema.pre("save", async function(next) {
  try {
    const patient = await Patient.findById(this.patientId);
    if (!patient) return next(new Error("Patient not found"));

    // get admin settings (take latest one)
    const config = await Config.findOne().sort({ createdAt: -1 });

    const seniorAge = config?.seniorAge || 60;
    const discountPercent = config?.discountPercent || 10;

    if (patient.age > seniorAge) {
      this.discount = this.amount * (discountPercent / 100);
    } else {
      this.discount = 0;
    }

    this.finalAmount = this.amount - this.discount;

    next();
  } catch (err) {
    next(err);
  }
});

module.exports = mongoose.model("Bill", BillSchema);