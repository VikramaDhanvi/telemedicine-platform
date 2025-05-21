const Appointment = require("../../models/Appointment");
const Doctor = require("../../models/doctor/Doctor");

exports.getUpcomingAppointment = async (req, res) => {
  try {
    const patientId = req.user.id;

    const appointments = await Appointment.find({
      patientId,
      status: "Upcoming",
      date: { $gte: new Date() },
    })
      .sort({ date: 1 }) // soonest first
      .populate("doctorId", "name specialization");

    if (!appointments || appointments.length === 0) {
      return res.json([]); // No upcoming appointments
    }

    const response = appointments.map((appt) => ({
      date: appt.date.toISOString().split("T")[0],
      time: appt.time,
      doctor: appt.doctorId?.name || "Doctor",
      specialization: appt.doctorId?.specialization || "Specialist",
      meetingLink: appt.meetingLink || "#",
    }));

    res.json(response);
  } catch (err) {
    console.error("Upcoming fetch failed:", err);
    res.status(500).json({ message: "Failed to load appointments." });
  }
};
