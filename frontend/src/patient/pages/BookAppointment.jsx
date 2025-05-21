import React, { useState, useEffect } from "react";
import { Container, Form, Button, Row, Col, Card, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const problemOptions = ["Fever", "Headache", "Cough", "Skin Rash", "Stomach Ache", "Other / Not Listed"];

const BookAppointment = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    height: "",
    weight: "",
    problem: "",
    description: "",
    otherNotes: "",
    date: "",
    time: "",
    doctorId: "",
  });

  const [doctors, setDoctors] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Fetch doctors
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/doctor/admin/doctors/all");
        const filtered = res.data.filter(doc => doc.name && doc.specialization); // ensure valid doctors
        setDoctors(filtered);
      } catch (err) {
        console.error("Failed to load doctors", err);
        setError("Unable to load doctors. Please try again later.");
      }
    };
    fetchDoctors();
  }, []);

  // Form field change handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // Form submission handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const hour = parseInt(form.time.split(":")[0]);

    if (hour < 9 || hour >= 17 || hour === 13) {
      return setError("Appointments must be between 9 AM to 5 PM, excluding 1 PM - 2 PM lunch break.");
    }

    try {
      const token = localStorage.getItem("patientToken");

      const res = await axios.post("http://localhost:5000/api/patient/appointments/book", form, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.status === 201) {
        setSuccess("Appointment booked successfully!");
        setTimeout(() => navigate("/patient/dashboard"), 1500);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Booking failed.");
    }
  };

  return (
    <div className="d-flex flex-column" style={{ minHeight: "100vh", backgroundColor: "#f8f9fa" }}>
      <Navbar />
      <Container className="my-5 flex-grow-1">
        <Card className="shadow-sm">
          <Card.Body>
            <h3 className="mb-4">Book an Appointment</h3>
            {error && <Alert variant="danger">{error}</Alert>}
            {success && <Alert variant="success">{success}</Alert>}

            <Form onSubmit={handleSubmit}>
              <Row className="mb-3">
                <Col md={6}>
                  <Form.Group>
                    <Form.Label>Height (in cm)</Form.Label>
                    <Form.Control type="number" name="height" value={form.height} onChange={handleChange} required />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group>
                    <Form.Label>Weight (in kg)</Form.Label>
                    <Form.Control type="number" name="weight" value={form.weight} onChange={handleChange} required />
                  </Form.Group>
                </Col>
              </Row>

              <Form.Group className="mb-3">
                <Form.Label>Select Problem</Form.Label>
                <Form.Select name="problem" value={form.problem} onChange={handleChange} required>
                  <option value="">-- Choose a problem --</option>
                  {problemOptions.map((opt, idx) => (
                    <option key={idx} value={opt}>{opt}</option>
                  ))}
                </Form.Select>
              </Form.Group>

              {form.problem === "Other / Not Listed" && (
                <Form.Group className="mb-3">
                  <Form.Label>Describe your symptoms</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              )}

              <Form.Group className="mb-3">
                <Form.Label>Other Notes (optional)</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={2}
                  name="otherNotes"
                  value={form.otherNotes}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Label>Select Doctor</Form.Label>
                <Form.Select name="doctorId" value={form.doctorId} onChange={handleChange} required>
                  <option value="">-- Choose a doctor --</option>
                  {doctors.length === 0 ? (
                    <option disabled>No doctors available</option>
                  ) : (
                    doctors.map((doc) => (
                      <option key={doc._id} value={doc._id}>
                        {doc.name} - {doc.specialization}
                      </option>
                    ))
                  )}
                </Form.Select>
              </Form.Group>

              <Row className="mb-4">
                <Col md={6}>
                  <Form.Group>
                    <Form.Label>Date</Form.Label>
                    <Form.Control type="date" name="date" value={form.date} onChange={handleChange} required />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group>
                    <Form.Label>Time</Form.Label>
                    <Form.Control type="time" name="time" value={form.time} onChange={handleChange} required />
                  </Form.Group>
                </Col>
              </Row>

              <Button variant="primary" type="submit">
                Book Appointment
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Container>
      <Footer />
    </div>
  );
};

export default BookAppointment;
