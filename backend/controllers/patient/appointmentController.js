const Appointment = require("../../models/Appointment");
const moment = require("moment");
const { createGoogleMeet } = require("../../Google/googleAuth"); // ✅ Import Google Meet generator

// ✅ Book Appointment
exports.bookAppointment = async (req, res) => {
  try {
    const {
      height,
      weight,
      problem,
      description,
      otherNotes,
      date,
      time,
      doctorId,
    } = req.body;

    const patientId = req.user.id;

    if (!doctorId || !date || !time || !problem) {
      return res.status(400).json({ message: "Missing required fields." });
    }

    const appointmentDateTime = moment(`${date} ${time}`, "YYYY-MM-DD HH:mm");

    if (!appointmentDateTime.isValid()) {
      return res.status(400).json({ message: "Invalid date or time format." });
    }

    const hour = appointmentDateTime.hour();
    if (hour < 9 || hour >= 17 || hour === 13) {
      return res.status(400).json({
        message: "Appointments must be between 9AM–5PM excluding 1PM–2PM.",
      });
    }

    const startWindow = moment(appointmentDateTime).subtract(30, "minutes");
    const endWindow = moment(appointmentDateTime).add(30, "minutes");

    const conflict = await Appointment.findOne({
      doctorId,
      date: {
        $gte: startWindow.toDate(),
        $lte: endWindow.toDate(),
      },
    });

    if (conflict) {
      return res.status(409).json({
        message: "Doctor already has an appointment within ±30 minutes. Please choose another time.",
      });
    }

    // ✅ Create Google Meet Link
    let meetingLink = "";
    try {
      meetingLink = await createGoogleMeet(
        "Doctor Consultation",
        `Consultation for ${problem}`,
        appointmentDateTime.toISOString(),
        appointmentDateTime.clone().add(30, "minutes").toISOString()
      );
      console.log("✅ Google Meet link created:", meetingLink);
    } catch (err) {
      console.error("❌ Error generating Meet link:", err.message);
      meetingLink = ""; // fallback if fails
    }

    // ✅ Save Appointment
    const newAppointment = await Appointment.create({
      doctorId,
      patientId,
      date: appointmentDateTime.toDate(),
      time: appointmentDateTime.format("HH:mm"),
      symptoms: problem === "Other / Not Listed" ? description : problem,
      notes: otherNotes || "None",
      otherNotes: otherNotes || "None",
      height: height || 0,
      weight: weight || 0,
      meetingLink: meetingLink,
      status: "Upcoming",
    });

    console.log("✅ New appointment created:", newAppointment);

    res.status(201).json({
      message: "Appointment booked successfully!",
      appointment: newAppointment,
    });

  } catch (err) {
    console.error("❌ Booking error:", err);
    res.status(500).json({ message: "Failed to book appointment", error: err.message });
  }
};

// ✅ Get Upcoming Appointments for Patient
exports.getUpcomingAppointments = async (req, res) => {
  try {
    const patientId = req.user.id;

    const appointments = await Appointment.find({
      patientId,
      date: { $gte: new Date() },
      status: "Upcoming",
    })
    .populate("doctorId", "name specialization")
    .sort({ date: 1 });

    const formatted = appointments.map((appt) => ({
      date: appt.date ? appt.date.toISOString().split("T")[0] : "N/A",
      time: appt.time || "N/A",
      doctorName: appt.doctorId?.name || "Unknown",
      specialization: appt.doctorId?.specialization || "General",
      meetingLink: appt.meetingLink || "",
    }));

    res.status(200).json(formatted);
  } catch (err) {
    console.error("❌ Error fetching patient appointments:", err);
    res.status(500).json({ message: "Failed to fetch appointments." });
  }
};

// ✅ Get Past Appointments for Patient
exports.getPastAppointmentsForPatient = async (req, res) => {
  try {
    const patientId = req.user.id;

    const appointments = await Appointment.find({
      patientId,
      date: { $lt: new Date() },
    })
    .populate("doctorId", "name specialization")
    .sort({ date: -1 });

    const formatted = appointments.map((appt) => ({
      id: appt._id,
      date: appt.date ? appt.date.toISOString().split("T")[0] : "N/A",
      time: appt.time || "N/A",
      doctor: appt.doctorId?.name || "Unknown",
      specialty: appt.doctorId?.specialization || "General",
      reason: appt.symptoms || "Consultation",
      meetingLink: appt.meetingLink || "",
      appointmentId: appt._id,
    }));

    res.status(200).json(formatted);
  } catch (err) {
    console.error("❌ Error loading past appointments:", err);
    res.status(500).json({ message: "Failed to fetch appointment history." });
  }
};
