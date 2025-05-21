const express = require("express");
const router = express.Router();
const { verifyToken } = require("../../middlewares/verifyToken");
const authenticatePatient = require("../../middlewares/patientAuth");

const {
  getUpcomingAppointments,
  getPastAppointmentsForPatient,
  bookAppointment
} = require("../../controllers/patient/appointmentController");

router.post("/book", authenticatePatient, bookAppointment);
router.get("/upcoming", authenticatePatient, getUpcomingAppointments);
router.get("/history", authenticatePatient, getPastAppointmentsForPatient);

module.exports = router;
