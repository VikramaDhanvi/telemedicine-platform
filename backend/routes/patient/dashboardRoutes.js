const express = require("express");
const router = express.Router();
const { getUpcomingAppointment } = require("../../controllers/patient/dashboardController");
const { verifyToken } = require("../../middlewares/verifyToken");

router.get("/upcoming", verifyToken, getUpcomingAppointment);

module.exports = router;
