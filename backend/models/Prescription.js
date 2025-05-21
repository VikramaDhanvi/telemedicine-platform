const mongoose = require("mongoose");

const medicationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  dosage: { type: String, required: true },
  frequency: { type: String, required: true },
  duration: { type: String, required: true },
});

const prescriptionSchema = new mongoose.Schema(
  {
    doctorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctor",
      required: true,
    },
    patientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patient",
      required: true,
    },
    doctorName: { type: String, required: true },
    specialty: { type: String },
    diagnosis: { type: String, required: true },
    medications: [medicationSchema],
    notes: { type: String },
    paid: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// ✅ This line avoids OverwriteModelError on hot reload
module.exports = mongoose.models.Prescription || mongoose.model("Prescription", prescriptionSchema);
