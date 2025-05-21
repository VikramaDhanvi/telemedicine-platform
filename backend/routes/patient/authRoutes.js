const express = require("express");
const router = express.Router();
const { signupPatient, loginPatient } = require("../../controllers/patient/patientAuthController");

router.post("/signup", signupPatient);
router.post("/login", loginPatient);

module.exports = router;
