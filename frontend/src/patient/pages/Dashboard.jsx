import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Spinner, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Dashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/patient/appointments/upcoming", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("patientToken")}`,
          },
        });

        if (!res.ok) throw new Error("Failed to load appointments.");
        const data = await res.json();
        console.log("📅 Upcoming Appointments:", data);
        setAppointments(data);
      } catch (err) {
        console.error("❌ Error:", err.message);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  const formatDate = (dateStr) => {
    if (!dateStr) return "N/A";
    const d = new Date(dateStr);
    return isNaN(d.getTime()) ? "N/A" : d.toLocaleDateString();
  };

  return (
    <div className="d-flex flex-column" style={{ minHeight: "100vh", backgroundColor: "#f8f9fa" }}>
      <Navbar />
      <Container className="my-4 flex-grow-1">
        <h2 className="mb-4">Welcome back!</h2>

        {/* Upcoming Appointment Section */}
        <section className="mb-5">
          <h4 className="mb-3">Upcoming Appointments</h4>

          {loading ? (
            <Spinner animation="border" />
          ) : error ? (
            <Alert variant="danger">{error}</Alert>
          ) : appointments.length > 0 ? (
            appointments.map((appointment) => (
              <Card className="shadow-sm mb-3" key={appointment._id || appointment.time}>
                <Card.Body>
                  <Row>
                    <Col md={6}>
                      <p><strong>Date:</strong> {formatDate(appointment.date)}</p>
                      <p><strong>Time:</strong> {appointment.time || "N/A"}</p>
                      <p><strong>Doctor:</strong> {appointment.doctorName || "Unknown"}</p>
                    </Col>
                    <Col md={6}>
                      <p><strong>Specialization:</strong> {appointment.specialization || "General"}</p>
                      <p>
                        <strong>Meeting Link:</strong>{" "}
                        {appointment.meetingLink ? (
                          <a
                            href={appointment.meetingLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-success btn-sm"
                          >
                            Join Video Call
                          </a>
                        ) : (
                          <span className="text-muted">Not available</span>
                        )}
                      </p>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            ))
          ) : (
            <p className="text-muted">No upcoming appointments.</p>
          )}
        </section>

        {/* Quick Access Cards */}
        <Row className="g-4">
          <Col md={4}>
            <Link to="/patient/profile" style={{ textDecoration: "none" }}>
              <Card className="shadow-sm text-center h-100">
                <Card.Body>
                  <Card.Title>My Profile</Card.Title>
                  <Card.Text className="text-muted">View and update your profile</Card.Text>
                </Card.Body>
              </Card>
            </Link>
          </Col>

          <Col md={4}>
            <Link to="/patient/book-appointment" style={{ textDecoration: "none" }}>
              <Card className="shadow-sm text-center h-100">
                <Card.Body>
                  <Card.Title>Book Appointment</Card.Title>
                  <Card.Text className="text-muted">Find and schedule an appointment</Card.Text>
                </Card.Body>
              </Card>
            </Link>
          </Col>

          <Col md={4}>
            <Link to="/patient/symptom-checker" style={{ textDecoration: "none" }}>
              <Card className="shadow-sm text-center h-100">
                <Card.Body>
                  <Card.Title>Symptom Checker</Card.Title>
                  <Card.Text className="text-muted">Get insights based on your symptoms</Card.Text>
                </Card.Body>
              </Card>
            </Link>
          </Col>
        </Row>
      </Container>
      <Footer />
    </div>
  );
};

export default Dashboard;
