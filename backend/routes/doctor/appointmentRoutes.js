const express = require("express");
const router = express.Router();
const { verifyToken } = require("../../middlewares/verifyToken");
const {
  getUpcomingAppointments,
  bookAppointment,
} = require("../../controllers/patient/appointmentController");

router.post("/book", verifyToken, bookAppointment);
router.get("/upcoming", verifyToken, getUpcomingAppointments);

module.exports = router;
