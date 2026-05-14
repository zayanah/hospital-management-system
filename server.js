// server.js
require("dotenv").config();
const express  = require("express");
const mongoose = require("mongoose");
const cors     = require("cors");
const apiRoutes = require("./routes/api");

const app  = express();
const PORT = process.env.PORT || 5000;

// ── Middleware ──────────────────────────────────────────
app.use(cors({ origin: "*" }));   // Allow frontend (file://) to call API
app.use(express.json());

// ── Routes ─────────────────────────────────────────────
app.use("/api", apiRoutes);

// Health check
app.get("/", (req, res) => {
  res.json({ status: "MediCare HMS API running", db: mongoose.connection.readyState === 1 ? "connected" : "disconnected" });
});

// ── Connect MongoDB then start ──────────────────────────
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅  MongoDB connected:", process.env.MONGO_URI);
    app.listen(PORT, () => console.log(`🚀  Server running at http://localhost:${PORT}`));
  })
  .catch(err => {
    console.error("❌  MongoDB connection failed:", err.message);
    process.exit(1);
  });
const adminRoutes = require("./routes/admin");
app.use("/admin", adminRoutes);

const billRoutes = require("./routes/billRoutes");
app.use("/bill", billRoutes);

app.use("/api", require("./routes/api"));