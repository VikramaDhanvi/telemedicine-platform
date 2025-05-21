const express = require("express");
const router = express.Router();
const Prescription = require("../models/Prescription");
const authenticateDoctor = require("../middleware/auth");

// POST /api/doctor/prescriptions/create
router.post("/prescriptions/create", authenticateDoctor, async (req, res) => {
  const { patientId, diagnosis, medications, notes } = req.body;

  if (!patientId || !diagnosis || !medications || medications.length === 0) {
    return res.status(400).json({ error: "All fields are required." });
  }

  try {
    const newPrescription = new Prescription({
      patientId,
      diagnosis,
      medications,
      notes,
    });

    await newPrescription.save();

    return res.status(201).json({ message: "Prescription saved successfully!" });
  } catch (err) {
    console.error("Error saving prescription:", err.message);
    return res.status(500).json({ error: "Server error." });
  }
});

module.exports = router;
