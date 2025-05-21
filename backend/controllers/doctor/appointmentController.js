const moment = require("moment");
const Appointment = require("../../models/Appointment");

// ✅ Book a new appointment
exports.bookAppointment = async (req, res) => {
  try {
    const {
      doctorId,
      date,
      time,
      symptoms,
      description,
      height,
      weight,
      otherNotes,
    } = req.body;

    const patientId = req.user.id;

    if (!doctorId || !date || !time || !symptoms) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const appointmentDateTime = moment(`${date} ${time}`, "YYYY-MM-DD HH:mm");

    if (!appointmentDateTime.isValid()) {
      return res.status(400).json({ message: "Invalid date or time format" });
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
        message: "Doctor already has an appointment within ±30 minutes.",
      });
    }

    const newAppointment = await Appointment.create({
      doctorId,
      patientId,
      date: appointmentDateTime.toDate(),
      time: appointmentDateTime.format("HH:mm"),
      symptoms: symptoms === "Other / Not Listed" ? description : symptoms,
      height: height || 0,
      weight: weight || 0,
      notes: otherNotes || "None",
      otherNotes: otherNotes || "None",
      meetingLink: "",
      status: "Upcoming",
    });

    console.log("✅ New Appointment Saved:", newAppointment);

    res.status(201).json({
      message: "Appointment booked successfully!",
      appointment: newAppointment,
    });
  } catch (err) {
    console.error("❌ Booking error:", err);
    res.status(500).json({ message: "Failed to book appointment", error: err.message });
  }
};

// ✅ Get Upcoming Appointments
exports.getUpcomingAppointments = async (req, res) => {
  try {
    const doctorId = req.user.id;

    const appointments = await Appointment.find({
      doctorId,
      status: "Upcoming",
      date: { $gte: new Date() },
    })
      .populate("patientId", "name gender dateOfBirth")
      .sort({ date: 1 });

    const formatted = appointments.map((appt) => ({
      _id: appt._id,
      patientId: appt.patientId?._id,
      patientName: appt.patientId?.name || "Unknown",
      date: appt.date ? moment(appt.date).format("YYYY-MM-DD") : "N/A",
      time: appt.time || "N/A",
      symptoms: appt.symptoms || "N/A",
      height: appt.height !== undefined ? appt.height : "N/A",
      weight: appt.weight !== undefined ? appt.weight : "N/A",
      notes: appt.notes || "None",
      otherNotes: appt.otherNotes || "None",
      meetingLink: appt.meetingLink || "",
      status: appt.status || "Upcoming",
      createdAt: appt.createdAt,
      updatedAt: appt.updatedAt,
      details: {
        gender: appt.patientId?.gender || "N/A",
        age: appt.patientId?.dateOfBirth
          ? new Date().getFullYear() - new Date(appt.patientId.dateOfBirth).getFullYear()
          : "N/A",
      },
    }));

    console.log("✅ Sending Upcoming Appointments:", formatted);

    res.status(200).json(formatted);
  } catch (err) {
    console.error("❌ Error fetching upcoming appointments:", err);
    res.status(500).json({ message: "Failed to load upcoming appointments." });
  }
};

// ✅ Get Past Appointments
exports.getPastAppointments = async (req, res) => {
  try {
    const doctorId = req.user.id;

    const appointments = await Appointment.find({
      doctorId,
      date: { $lt: new Date() },
    })
      .populate("patientId", "name gender dateOfBirth")
      .sort({ date: -1 });

    const formatted = appointments.map((appt) => ({
      _id: appt._id,
      patientId: appt.patientId?._id,
      patientName: appt.patientId?.name || "Unknown",
      date: appt.date ? moment(appt.date).format("YYYY-MM-DD") : "N/A",
      time: appt.time || "N/A",
      symptoms: appt.symptoms || "N/A",
      height: appt.height !== undefined ? appt.height : "N/A",
      weight: appt.weight !== undefined ? appt.weight : "N/A",
      notes: appt.notes || "None",
      otherNotes: appt.otherNotes || "None",
      meetingLink: appt.meetingLink || "",
      status: appt.status || "Completed",
      createdAt: appt.createdAt,
      updatedAt: appt.updatedAt,
      details: {
        gender: appt.patientId?.gender || "N/A",
        age: appt.patientId?.dateOfBirth
          ? new Date().getFullYear() - new Date(appt.patientId.dateOfBirth).getFullYear()
          : "N/A",
      },
    }));

    console.log("✅ Sending Past Appointments:", formatted);

    res.status(200).json(formatted);
  } catch (err) {
    console.error("❌ Error fetching past appointments:", err);
    res.status(500).json({ message: "Failed to load past appointments." });
  }
};
