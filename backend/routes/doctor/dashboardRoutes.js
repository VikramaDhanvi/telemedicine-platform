const express = require("express");
const router = express.Router();
const { verifyToken } = require("../../middlewares/verifyToken");
const { getDoctorUpcomingAppointments } = require("../../controllers/doctor/doctorDashboardController");

// GET /api/doctor/appointments/dashboard/upcoming
router.get("/appointments/dashboard/upcoming", verifyToken, getDoctorUpcomingAppointments);

module.exports = router;
