// routes/api.js
const express = require("express");
const router = express.Router();

const Patient = require("../models/Patient");
const Doctor = require("../models/Doctor");
const Appointment = require("../models/Appointment");
const Bill = require("../models/Bill");


/* ─────────────── DOWNLOAD CSV ─────────────── */
router.get("/download", async (req, res) => {
  try {
    const bills = await Bill.find({ finalAmount: { $gt: 1000 } })
      .populate("patientId", "name age");

    let csv = "Patient Name,Age,Service,Amount,Discount,Final Amount,Date,Status\n";

    bills.forEach(b => {
      csv += `${b.patientId?.name || ""},${b.patientId?.age || ""},${b.service},${b.amount},${b.discount},${b.finalAmount},${b.date},${b.status}\n`;
    });

    res.header("Content-Type", "text/csv");
    res.attachment("bills_over_1000.csv");

    res.send(csv);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


/* ─────────────── PATIENTS ─────────────── */
router.get("/patients", async (req, res) => {
  try {
    const patients = await Patient.find().sort({ createdAt: -1 });
    res.json(patients);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

router.post("/patients", async (req, res) => {
  try {
    const patient = await Patient.create(req.body);
    res.status(201).json(patient);
  } catch (err) { res.status(400).json({ error: err.message }); }
});

router.put("/patients/:id", async (req, res) => {
  try {
    const patient = await Patient.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!patient) return res.status(404).json({ error: "Patient not found" });
    res.json(patient);
  } catch (err) { res.status(400).json({ error: err.message }); }
});

router.delete("/patients/:id", async (req, res) => {
  try {
    await Patient.findByIdAndDelete(req.params.id);
    res.json({ message: "Patient deleted" });
  } catch (err) { res.status(500).json({ error: err.message }); }
});


/* ─────────────── DOCTORS ─────────────── */
router.get("/doctors", async (req, res) => {
  try {
    const doctors = await Doctor.find().sort({ createdAt: -1 });
    res.json(doctors);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

router.post("/doctors", async (req, res) => {
  try {
    const doctor = await Doctor.create(req.body);
    res.status(201).json(doctor);
  } catch (err) { res.status(400).json({ error: err.message }); }
});

router.put("/doctors/:id", async (req, res) => {
  try {
    const doctor = await Doctor.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!doctor) return res.status(404).json({ error: "Doctor not found" });
    res.json(doctor);
  } catch (err) { res.status(400).json({ error: err.message }); }
});

router.delete("/doctors/:id", async (req, res) => {
  try {
    await Doctor.findByIdAndDelete(req.params.id);
    res.json({ message: "Doctor deleted" });
  } catch (err) { res.status(500).json({ error: err.message }); }
});


/* ─────────────── APPOINTMENTS ─────────────── */
router.get("/appointments", async (req, res) => {
  try {
    const appointments = await Appointment.find()
      .populate("patientId", "name phone")
      .populate("doctorId", "name spec")
      .sort({ date: -1 });
    res.json(appointments);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

router.post("/appointments", async (req, res) => {
  try {
    const appt = await Appointment.create(req.body);
    const populated = await appt.populate(["patientId","doctorId"]);
    res.status(201).json(populated);
  } catch (err) { res.status(400).json({ error: err.message }); }
});

router.put("/appointments/:id", async (req, res) => {
  try {
    const appt = await Appointment.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
      .populate("patientId", "name")
      .populate("doctorId", "name");

    if (!appt) return res.status(404).json({ error: "Appointment not found" });
    res.json(appt);
  } catch (err) { res.status(400).json({ error: err.message }); }
});

router.delete("/appointments/:id", async (req, res) => {
  try {
    await Appointment.findByIdAndDelete(req.params.id);
    res.json({ message: "Appointment deleted" });
  } catch (err) { res.status(500).json({ error: err.message }); }
});


/* ─────────────── BILLS ─────────────── */
router.get("/bills", async (req, res) => {
  try {
    const bills = await Bill.find()
      .populate("patientId", "name phone")
      .sort({ createdAt: -1 });
    res.json(bills);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

router.post("/bills", async (req, res) => {
  try {
    const bill = await Bill.create(req.body);
    const populated = await bill.populate("patientId", "name");
    res.status(201).json(populated);
  } catch (err) { res.status(400).json({ error: err.message }); }
});

router.put("/bills/:id", async (req, res) => {
  try {
    const bill = await Bill.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
      .populate("patientId", "name");

    if (!bill) return res.status(404).json({ error: "Bill not found" });
    res.json(bill);
  } catch (err) { res.status(400).json({ error: err.message }); }
});

router.delete("/bills/:id", async (req, res) => {
  try {
    await Bill.findByIdAndDelete(req.params.id);
    res.json({ message: "Bill deleted" });
  } catch (err) { res.status(500).json({ error: err.message }); }
});


/* ─────────────── STATS ─────────────── */
router.get("/stats", async (req, res) => {
  try {
    const [patients, doctors, appointments, bills] = await Promise.all([
      Patient.countDocuments(),
      Doctor.countDocuments(),
      Appointment.countDocuments(),
      Bill.aggregate([
        { $group: { _id: "$status", total: { $sum: "$amount" } } }
      ])
    ]);

    const revenue = bills.find(b => b._id === "paid")?.total || 0;
    const pending = bills.find(b => b._id === "pending")?.total || 0;
    const overdue = bills.find(b => b._id === "overdue")?.total || 0;

    res.json({ patients, doctors, appointments, revenue, pending, overdue });

  } catch (err) { res.status(500).json({ error: err.message }); }
});


/* ─────────────── EXPORT ─────────────── */
module.exports = router;