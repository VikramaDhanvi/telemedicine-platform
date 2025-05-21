const express = require("express");
const router = express.Router();
const { loginDoctor, getDoctorProfile } = require("../../controllers/doctor/doctorAuthController");
const { verifyToken } = require("../../middlewares/verifyToken");

router.post("/login", loginDoctor);
router.get("/profile", verifyToken, getDoctorProfile);

module.exports = router;
