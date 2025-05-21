const Doctor = require('../../models/doctor/Doctor');
const bcrypt = require('bcryptjs');

// GET all approved doctors
exports.getApprovedDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find({ isApproved: true }).select('-__v');
    res.status(200).json(doctors);
  } catch (err) {
    console.error('Error fetching doctors:', err);
    res.status(500).json({ message: "Failed to fetch doctors.", error: err.message });
  }
};

// POST reset password for a doctor
exports.resetDoctorPassword = async (req, res) => {
  const { id } = req.params;
  const { password } = req.body;

  if (!password || password.length < 6) {
    return res.status(400).json({ message: "Password must be at least 6 characters." });
  }

  try {
    const doctor = await Doctor.findById(id);
    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    doctor.password = hashedPassword;
    await doctor.save();

    res.status(200).json({ message: "Password updated successfully." });
  } catch (err) {
    console.error('Error resetting password:', err);
    res.status(500).json({ message: "Password update failed.", error: err.message });
  }
};
