const Patient = require("../../models/patient/Patient");

exports.getPatientProfile = async (req, res) => {
  try {
    const patientId = req.user.id;

    const patient = await Patient.findById(patientId).select("name email gender dateOfBirth phone bloodGroup address");

    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    res.status(200).json(patient);
  } catch (err) {
    console.error("❌ Error fetching profile:", err);
    res.status(500).json({ message: "Failed to load profile." });
  }
};
