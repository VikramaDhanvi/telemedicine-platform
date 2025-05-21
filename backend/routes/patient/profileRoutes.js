const express = require("express");
const router = express.Router();
const { getPatientProfile } = require("../../controllers/patient/profileController");
const authenticatePatient = require("../../middlewares/patientAuth");

router.get("/", authenticatePatient, getPatientProfile);

module.exports = router;
