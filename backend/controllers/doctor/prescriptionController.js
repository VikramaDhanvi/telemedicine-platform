const Prescription = require("../../models/prescription/Prescription");

exports.createPrescription = async (req, res) => {
  try {
    const { patientId, diagnosis, medications, notes } = req.body;
    const doctorId = req.user.id;

    // 🧠 Debug logs
    console.log("🛠 Request Body:", req.body);
    console.log("👨‍⚕️ Doctor From Token:", req.user);

    if (!patientId || !diagnosis || !medications || medications.length === 0) {
      return res.status(400).json({ message: "Missing required fields." });
    }

    const prescription = await Prescription.create({
      doctorId,
      patientId,
      diagnosis,
      medications,
      notes,
      doctorName: req.user.name || "Dr. Unknown",     // 🔥 Safe fallback
      specialty: req.user.specialty || "General",     // 🔥 Safe fallback
      paid: false,                                    // Default
    });

    res.status(201).json({
      message: "Prescription created successfully",
      prescription,
    });
  } catch (err) {
    console.error("❌ Prescription creation error:", err);
    res.status(500).json({
      message: "Failed to create prescription",
      error: err.message,
      stack: err.stack,
    });
  }
};

// ✅ Mark a prescription as paid
exports.markPrescriptionAsPaid = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedPrescription = await Prescription.findByIdAndUpdate(
      id,
      { paid: true },
      { new: true }
    );

    if (!updatedPrescription) {
      return res.status(404).json({ message: "Prescription not found" });
    }

    res.status(200).json({
      message: "Prescription marked as paid",
      prescription: updatedPrescription,
    });
  } catch (err) {
    console.error("❌ Error marking prescription as paid:", err);
    res.status(500).json({
      message: "Failed to update prescription",
      error: err.message,
    });
  }
};
