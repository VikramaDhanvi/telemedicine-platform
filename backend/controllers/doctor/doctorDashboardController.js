const Appointment = require("../../models/Appointment");

exports.getDoctorUpcomingAppointments = async (req, res) => {
  try {
    const doctorId = req.user.id;

    const appointments = await Appointment.find({
      doctorId,
      status: "Upcoming",
      date: { $gte: new Date() }
    })
      .sort({ date: 1 })
      .populate("patientId", "name gender dateOfBirth");

    const formatted = appointments.map((appt) => ({
      _id: appt._id,
      patientId: appt.patientId?._id?.toString() || null,
      patientName: appt.patientId?.name || "Unknown",
      time: appt.time,
      reason: appt.symptoms || "Consultation",
      details: {
        gender: appt.patientId?.gender || "N/A",
        age: appt.patientId?.dateOfBirth
          ? new Date().getFullYear() - new Date(appt.patientId.dateOfBirth).getFullYear()
          : "N/A",
        symptoms: appt.symptoms || "Not specified",
        notes: appt.notes || "",
        lastVisit: appt.date.toISOString().split("T")[0],
      },
    }));

    res.status(200).json(formatted);
  } catch (err) {
    console.error("❌ Failed to fetch doctor's upcoming appointments:", err);
    res.status(500).json({ message: "Unable to fetch appointments." });
  }
};
