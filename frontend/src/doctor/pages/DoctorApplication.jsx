import React, { useState } from "react";
import { Form, Button, Container, Row, Col, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import DoctorNavbar from "../components/Navbar";

const DoctorApplication = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    specialization: "",
    license: null,
    degree: null,
    agreedToTerms: false,
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, type, value, checked, files } = e.target;

    if (type === "file") {
      setFormData((prev) => ({ ...prev, [name]: files[0] }));
    } else if (type === "checkbox") {
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    if (!formData.agreedToTerms) {
      setError("You must agree to the terms and conditions.");
      return;
    }

    try {
      const payload = new FormData();
      Object.keys(formData).forEach((key) => {
        payload.append(key, formData[key]);
      });

      const res = await axios.post("http://localhost:5000/api/doctor/apply", payload, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (res.status === 200 || res.status === 201) {
        setSuccess(true);
        setTimeout(() => navigate("/doctor/login"), 2000);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Application failed. Try again.");
    }
  };

  const styles = {
    container: { marginTop: "40px", marginBottom: "60px" },
    heading: {
      fontWeight: "600",
      fontSize: "1.6rem",
      marginBottom: "25px",
      textAlign: "center",
    },
    formLabel: { fontWeight: "500" },
    checkbox: { fontSize: "0.9rem" },
    submitButton: {
      padding: "10px",
      fontSize: "1rem",
      fontWeight: "500",
    },
  };

  return (
    <>
      <DoctorNavbar />
      <Container style={styles.container}>
        <Row className="justify-content-md-center">
          <Col md={7}>
            <h3 style={styles.heading}>Doctor Application Form</h3>

            {error && <Alert variant="danger">{error}</Alert>}
            {success && (
              <Alert variant="success">
                Application submitted! You'll be notified upon approval.
              </Alert>
            )}

            <Form onSubmit={handleSubmit} encType="multipart/form-data">
              <Form.Group className="mb-3">
                <Form.Label style={styles.formLabel}>Full Name</Form.Label>
                <Form.Control
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label style={styles.formLabel}>Email Address</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label style={styles.formLabel}>Specialization</Form.Label>
                <Form.Control
                  type="text"
                  name="specialization"
                  value={formData.specialization}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label style={styles.formLabel}>Medical License (PDF)</Form.Label>
                <Form.Control
                  type="file"
                  name="license"
                  accept=".pdf"
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label style={styles.formLabel}>Medical Degree Certificate (PDF)</Form.Label>
                <Form.Control
                  type="file"
                  name="degree"
                  accept=".pdf"
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Check
                  type="checkbox"
                  name="agreedToTerms"
                  label="I agree to the terms and conditions."
                  style={styles.checkbox}
                  checked={formData.agreedToTerms}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Button variant="primary" type="submit" className="w-100" style={styles.submitButton}>
                Submit Application
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default DoctorApplication;
