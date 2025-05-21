import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Container, Card, Form, Button, Alert, Spinner } from "react-bootstrap";

const VerifyDoctor = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [application, setApplication] = useState(null);
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchApplication = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/doctor/admin/applications");
        const doc = res.data.find((app) => app._id === id);
        if (doc) setApplication(doc);
        else setError("Doctor application not found.");
      } catch (err) {
        setError("Failed to load application.");
      } finally {
        setLoading(false);
      }
    };

    fetchApplication();
  }, [id]);

  const handleApprove = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!password || password.length < 6) {
      return setError("Password must be at least 6 characters.");
    }

    try {
      await axios.post(`http://localhost:5000/api/doctor/admin/approve/${id}`, {
        password,
      });

      setSuccess("Doctor approved and password set!");
      setTimeout(() => navigate("/admin/dashboard"), 2000);
    } catch (err) {
      setError(err.response?.data?.message || "Approval failed.");
    }
  };

  if (loading) {
    return (
      <Container className="mt-5 text-center">
        <Spinner animation="border" />
      </Container>
    );
  }

  if (!application) {
    return (
      <Container className="mt-5">
        <Alert variant="danger">{error || "Application not found."}</Alert>
      </Container>
    );
  }

  return (
    <Container className="mt-5 mb-5">
      <Card className="p-4 shadow">
        <h3 className="mb-3">Verify & Approve Doctor</h3>

        <p><strong>Name:</strong> {application.name}</p>
        <p><strong>Email:</strong> {application.email}</p>
        <p><strong>Specialization:</strong> {application.specialization}</p>
        <p><strong>Status:</strong> {application.status}</p>

        <div className="mb-3">
          <p><strong>Medical License:</strong></p>
          <iframe
            src={`http://localhost:5000/${application.licenseDocPath}`}
            width="100%"
            height="400px"
            title="License Document"
          />
        </div>

        <div className="mb-4">
          <p><strong>Medical Degree Certificate:</strong></p>
          <iframe
            src={`http://localhost:5000/${application.degreeDocPath}`}
            width="100%"
            height="400px"
            title="Degree Document"
          />
        </div>

        <Form onSubmit={handleApprove}>
          <Form.Group className="mb-3">
            <Form.Label>Set Doctor Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Form.Group>

          {error && <Alert variant="danger">{error}</Alert>}
          {success && <Alert variant="success">{success}</Alert>}

          <Button type="submit" variant="success">
            Approve Doctor
          </Button>
        </Form>
      </Card>
    </Container>
  );
};

export default VerifyDoctor;
