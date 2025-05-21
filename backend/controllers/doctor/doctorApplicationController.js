const DoctorApplication = require('../../models/doctor/DoctorApplication');
const Doctor = require('../../models/doctor/Doctor');
const bcrypt = require('bcryptjs');

// Doctor submits application
exports.submitDoctorApplication = async (req, res) => {
  try {
    const { fullName, email, specialization } = req.body;

    if (!fullName || !email || !specialization || !req.files.license || !req.files.degree) {
      return res.status(400).json({ message: 'All fields and documents are required.' });
    }

    const exists = await DoctorApplication.findOne({ email });
    if (exists) return res.status(400).json({ message: 'Application already submitted.' });

    const application = await DoctorApplication.create({
      name: fullName,
      email,
      specialization,
      licenseDocPath: req.files.license[0].path,
      degreeDocPath: req.files.degree[0].path
    });

    res.status(201).json({ message: 'Application submitted successfully!', application });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to submit application.', error: err.message });
  }
};

// Admin fetches all doctor applications
exports.getAllApplications = async (req, res) => {
  try {
    const applications = await DoctorApplication.find().sort({ submittedAt: -1 });
    res.json(applications);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch doctor applications.', error: err.message });
  }
};

// Admin approves application and creates doctor
exports.approveDoctorApplication = async (req, res) => {
  const { applicationId } = req.params;
  const { password } = req.body;

  try {
    if (!password || password.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters.' });
    }

    const application = await DoctorApplication.findById(applicationId);
    if (!application) {
      return res.status(404).json({ message: 'Application not found.' });
    }

    if (application.status === 'Approved') {
      return res.status(400).json({ message: 'Doctor already approved.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const doctor = await Doctor.create({
      name: application.name,
      email: application.email,
      password: hashedPassword,
      specialization: application.specialization,
      licenseNo: application.licenseDocPath,
      isApproved: true
    });

    application.status = 'Approved';
    application.reviewedAt = new Date();
    await application.save();

    res.status(201).json({ message: 'Doctor approved successfully.', doctor });
  } catch (err) {
    res.status(500).json({ message: 'Failed to approve doctor.', error: err.message });
  }
};
