const express = require("express");
const router = express.Router();

const { getAllPrescriptionsForPatient } = require("../../controllers/patient/prescriptionController");
const authenticatePatient = require("../../middlewares/patientAuth");

router.get("/all", authenticatePatient, getAllPrescriptionsForPatient);

module.exports = router;
