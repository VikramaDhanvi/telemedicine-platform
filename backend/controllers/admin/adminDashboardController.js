const Patient = require("../../models/patient/Patient");

exports.getPatientCount = async (req, res) => {
  try {
    const count = await Patient.countDocuments();
    res.status(200).json({ count });
  } catch (err) {
    console.error("Failed to fetch patient count:", err);
    res.status(500).json({ message: "Failed to fetch patient count" });
  }
};
