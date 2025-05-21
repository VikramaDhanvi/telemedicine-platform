import React, { useState } from "react";
import { Form, Button, Container, Card, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import PatientNavbar from "../components/Navbar";
import Footer from "../components/Footer";

const PatientLogin = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post("http://localhost:5000/api/patient/auth/login", credentials);
      if (res.status === 200) {
        localStorage.setItem("patientToken", res.data.token);
        navigate("/patient/dashboard");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Please try again.");
    }
  };

  return (
    <>
      <PatientNavbar />
      <Container style={{ marginTop: "60px", marginBottom: "40px" }}>
        <Card
          style={{
            padding: "30px",
            borderRadius: "12px",
            boxShadow: "0 0 12px rgba(0,0,0,0.08)",
            maxWidth: "500px",
            margin: "0 auto",
          }}
        >
          <h3 className="text-center mb-4">Patient Login</h3>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleLogin}>
            <Form.Group className="mb-3">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                name="email"
                placeholder="Enter email"
                value={credentials.email}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                placeholder="Password"
                value={credentials.password}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100">
              Login
            </Button>

            <div className="text-center mt-3">
              Don’t have an account?{" "}
              <span
                style={{ color: "#007bff", cursor: "pointer" }}
                onClick={() => navigate("/patient/signup")}
              >
                Sign up here
              </span>
            </div>
          </Form>
        </Card>
      </Container>
      <Footer />
    </>
  );
};

export default PatientLogin;
