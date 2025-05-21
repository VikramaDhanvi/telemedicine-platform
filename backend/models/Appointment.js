const mongoose = require("mongoose"); // ✅ Important!

const appointmentSchema = new mongoose.Schema({
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
  date: {
    type: Date,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  symptoms: {
    type: String,
    required: true,
  },
  height: {
    type: Number,
    required: false,
  },
  weight: {
    type: Number,
    required: false,
  },
  notes: {
    type: String,
    default: "None",
  },
  otherNotes: {
    type: String,
    default: "None",
  },
  meetingLink: {
    type: String,
    default: "",
  },
  status: {
    type: String,
    enum: ["Upcoming", "Completed", "Cancelled"],
    default: "Upcoming",
  },
}, { timestamps: true }); // ✅ Automatically add createdAt and updatedAt

module.exports = mongoose.model("Appointment", appointmentSchema);
