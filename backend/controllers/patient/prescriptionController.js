const Prescription = require("../../models/prescription/Prescription");

exports.getAllPrescriptionsForPatient = async (req, res) => {
  try {
    const patientId = req.user.id;

    const prescriptions = await Prescription.find({ patientId })
      .sort({ createdAt: -1 })
      .lean();

    res.status(200).json(prescriptions);
  } catch (err) {
    console.error("❌ Error fetching prescriptions:", err.message);
    res.status(500).json({ message: "Failed to fetch prescriptions." });
  }
};
