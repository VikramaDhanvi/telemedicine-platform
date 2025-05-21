import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button, Table, Spinner, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import DoctorNavbar from "../components/Navbar";

const DoctorDashboard = () => {
  const navigate = useNavigate();
  const [doctor, setDoctor] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDoctorData = async () => {
      try {
        const token = localStorage.getItem("doctorToken");

        const [doctorRes, appointmentsRes] = await Promise.all([
          axios.get("http://localhost:5000/api/doctor/auth/profile", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get("http://localhost:5000/api/doctor/appointments/dashboard/upcoming", {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        setDoctor(doctorRes.data);
        setAppointments(appointmentsRes.data);
      } catch (err) {
        console.error("❌ Error loading dashboard:", err);
        setError("Failed to load dashboard.");
      } finally {
        setLoading(false);
      }
    };

    fetchDoctorData();
  }, []);

  const handleToggleDetails = (appointment) => {
    setSelectedAppointment((prev) => (prev?._id === appointment._id ? null : appointment));
  };

  const handleStartConsultation = (appointment) => {
    const { patientName, _id } = appointment;
    const encodedName = encodeURIComponent(patientName);
    const encodedId = encodeURIComponent(_id);

    // Navigate to local consultation route
    navigate(`/doctor/consultation?patient=${encodedName}&id=${encodedId}`);

    // Open prescription in new tab
    const prescriptionUrl = `/doctor/prescription?patient=${encodedName}&id=${encodedId}`;
    window.open(prescriptionUrl, "_blank", "noopener noreferrer");
  };

  const styles = {
    wrapper: { marginTop: "30px", marginBottom: "60px" },
    card: {
      padding: "25px",
      borderRadius: "12px",
      boxShadow: "0 0 15px rgba(0,0,0,0.05)",
      marginBottom: "30px",
    },
    title: {
      fontSize: "1.8rem",
      fontWeight: "600",
      marginBottom: "20px",
    },
    label: { fontWeight: "500", color: "#555" },
    value: { fontWeight: "400", color: "#222" },
  };

  return (
    <>
      <DoctorNavbar />
      <Container style={styles.wrapper}>
        <Row className="justify-content-center">
          <Col md={10}>
            {loading ? (
              <Spinner animation="border" />
            ) : error ? (
              <Alert variant="danger">{error}</Alert>
            ) : doctor && (
              <>
                {/* Welcome Card */}
                <Card style={styles.card}>
                  <h2 style={styles.title}>Welcome, Dr. {doctor.name} 👨‍⚕️</h2>
                  <div className="mb-2">
                    <span style={styles.label}>Specialization:</span>{" "}
                    <span style={styles.value}>{doctor.specialization}</span>
                  </div>
                  <div className="mb-2">
                    <span style={styles.label}>Email:</span>{" "}
                    <span style={styles.value}>{doctor.email}</span>
                  </div>
                </Card>

                {/* Upcoming Appointments */}
                <Card style={styles.card}>
                  <h3 style={{ ...styles.title, fontSize: "1.6rem" }}>Upcoming Appointments</h3>

                  {appointments.length === 0 ? (
                    <p className="text-muted">No upcoming appointments found.</p>
                  ) : (
                    <Table responsive bordered hover>
                      <thead>
                        <tr>
                          <th>Patient Name</th>
                          <th>Date & Time</th>
                          <th>Reason</th>
                          <th>Status</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {appointments.map((appt) => (
                          <tr key={appt._id}>
                            <td>{appt.patientName}</td>
                            <td>{appt.date || "N/A"} | {appt.time || "N/A"}</td>
                            <td>{appt.symptoms || "Consultation"}</td>
                            <td>{appt.status || "Upcoming"}</td>
                            <td>
                              <Button
                                variant="primary"
                                size="sm"
                                className="me-2"
                                onClick={() => handleToggleDetails(appt)}
                              >
                                {selectedAppointment?._id === appt._id ? "Hide Details" : "View Details"}
                              </Button>
                              <Button
                                variant="success"
                                size="sm"
                                onClick={() => handleStartConsultation(appt)}
                              >
                                Start Consultation
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  )}
                </Card>

                {/* Selected Appointment Details */}
                {selectedAppointment && (
                  <Card style={styles.card}>
                    <h4 className="mb-4">Patient Details: {selectedAppointment.patientName}</h4>
                    <Row>
                      <Col md={6}>
                        <p><strong>Date:</strong> {selectedAppointment.date || "N/A"}</p>
                        <p><strong>Time:</strong> {selectedAppointment.time || "N/A"}</p>
                        <p><strong>Symptoms:</strong> {selectedAppointment.details?.symptoms || "N/A"}</p>
                      </Col>
                      <Col md={6}>
                        <p><strong>Gender:</strong> {selectedAppointment.details?.gender || "N/A"}</p>
                        <p><strong>Age:</strong> {selectedAppointment.details?.age || "N/A"}</p>
                        <p><strong>Doctor's Notes:</strong> {selectedAppointment.notes || "None"}</p>
                      </Col>
                    </Row>
                  </Card>
                )}
              </>
            )}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default DoctorDashboard;
