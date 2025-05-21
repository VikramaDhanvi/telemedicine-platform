const mongoose = require("mongoose");

const medicationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  dosage: { type: String, required: true },
  frequency: { type: String, required: true },
  duration: { type: String, required: true },
});

const prescriptionSchema = new mongoose.Schema(
  {
    doctorId: { type: mongoose.Schema.Types.ObjectId, ref: "Doctor", required: true },
    patientId: { type: mongoose.Schema.Types.ObjectId, ref: "Patient", required: true },
    appointmentId: { type: mongoose.Schema.Types.ObjectId, ref: "Appointment" }, // ✅ NEW
    diagnosis: { type: String, required: true },
    medications: [medicationSchema],
    notes: { type: String },
    doctorName: { type: String, required: false }, // 🔥 Make doctorName optional
    specialty: { type: String, default: "General" }, // 🔥 Add default value
    paid: { type: Boolean, default: false }, // 🔥 Default to false
  },
  { timestamps: true }
);

module.exports = mongoose.models.Prescription || mongoose.model("Prescription", prescriptionSchema);
