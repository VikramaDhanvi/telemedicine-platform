const express = require('express');
const router = express.Router();
const {
  getApprovedDoctors,
  resetDoctorPassword
} = require('../../controllers/doctor/doctorManagementController');

router.get('/all', getApprovedDoctors);
router.post('/reset-password/:id', resetDoctorPassword);

module.exports = router;
