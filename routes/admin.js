const express = require("express");
const router = express.Router();
const Config = require("../models/Config");

// Set/update discount settings
router.post("/discount", async (req, res) => {
  try {
    const { seniorAge, discountPercent } = req.body;

    const config = new Config({
      seniorAge,
      discountPercent
    });

    await config.save();

    res.json({ message: "Settings saved", config });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;