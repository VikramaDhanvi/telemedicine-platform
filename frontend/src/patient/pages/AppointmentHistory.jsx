import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const AppointmentHistory = () => {
  const [appointments, setAppointments] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const token = localStorage.getItem("patientToken");

        const [pastRes, upcomingRes, presRes] = await Promise.all([
          axios.get("http://localhost:5000/api/patient/appointments/history", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get("http://localhost:5000/api/patient/appointments/upcoming", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get("http://localhost:5000/api/patient/prescriptions/all", {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        const pastAppointments = pastRes.data.map((appt) => ({
          ...appt,
          appointmentType: "Past", 
        }));

        const upcomingAppointments = upcomingRes.data.map((appt) => ({
          ...appt,
          appointmentType: "Upcoming", 
        }));

        const prescriptionAppointmentIds = presRes.data; // appointmentIds with prescriptions

        const updatedPastAppointments = pastAppointments.map((appt) => ({
          ...appt,
          status: prescriptionAppointmentIds.includes(appt.appointmentId)
            ? "Completed"
            : "Missed",
        }));

        const updatedUpcomingAppointments = upcomingAppointments.map((appt) => ({
          ...appt,
          status: "Upcoming",
        }));

        const combinedAppointments = [
          ...updatedPastAppointments,
          ...updatedUpcomingAppointments,
        ];

        setAppointments(combinedAppointments);
      } catch (err) {
        console.error("❌ Error loading appointments:", err);
        setError("Failed to load appointments.");
      }
    };

    fetchAppointments();
  }, []);

  return (
    <div className="container py-4">
      <h2 className="mb-4 text-primary">My Appointment History</h2>

      {error && <p className="text-danger">{error}</p>}

      {appointments.length === 0 ? (
        <p>No appointments found.</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped table-bordered">
            <thead className="table-dark">
              <tr>
                <th>Date</th>
                <th>Time</th>
                <th>Doctor</th>
                <th>Specialty</th>
                <th>Reason</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((appt) => (
                <tr key={appt.id || appt._id}>
                  <td>{appt.date || "N/A"}</td>
                  <td>{appt.time || "N/A"}</td>
                  <td>{appt.doctor || appt.doctorName || "Doctor"}</td>
                  <td>{appt.specialty || "General"}</td>
                  <td>{appt.reason || "Consultation"}</td>
                  <td>
                    <span
                      className={`badge ${
                        appt.status === "Completed"
                          ? "bg-success"
                          : appt.status === "Missed"
                          ? "bg-danger"
                          : "bg-info"
                      }`}
                    >
                      {appt.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AppointmentHistory;
