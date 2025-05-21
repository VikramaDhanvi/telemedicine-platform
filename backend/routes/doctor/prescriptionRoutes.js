const express = require('express');
const router = express.Router();
const { verifyToken } = require("../../middlewares/verifyToken");
const { createPrescription } = require("../../controllers/doctor/prescriptionController");

// 🔥 Route to create a prescription
router.post("/create", verifyToken, createPrescription);

module.exports = router;
