const express = require("express");
const router = express.Router();

const { getPatientCount } = require("../../controllers/admin/adminDashboardController");

// Route to get total number of patients
router.get("/patient-count", getPatientCount);

module.exports = router;
