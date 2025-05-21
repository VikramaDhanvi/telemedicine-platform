const express = require('express');
const router = express.Router();
const upload = require('../../middlewares/upload.js');
const {
  submitDoctorApplication,
  getAllApplications,
  approveDoctorApplication
} = require('../../controllers/doctor/doctorApplicationController');

// Doctor submits application (with PDFs)
router.post(
  '/apply',
  upload.fields([
    { name: 'license', maxCount: 1 },
    { name: 'degree', maxCount: 1 }
  ]),
  submitDoctorApplication
);

// Admin fetches all doctor applications
router.get('/admin/applications', getAllApplications);

// Admin approves doctor and sets password
router.post('/admin/approve/:applicationId', approveDoctorApplication);

module.exports = router;
