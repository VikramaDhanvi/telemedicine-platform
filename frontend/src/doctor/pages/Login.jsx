import React, { useState } from "react";
import { Form, Button, Container, Row, Col, Alert, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import DoctorNavbar from "../components/Navbar";

const DoctorLogin = () => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("http://localhost:5000/api/doctor/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Login failed.");

      localStorage.setItem("doctorToken", data.token);
      navigate("/doctor/dashboard");
    } catch (err) {
      setError(err.message || "Login failed. Please try again.");
    }
  };

  const styles = {
    wrapper: {
      marginTop: "50px",
      marginBottom: "80px",
    },
    card: {
      padding: "30px",
      borderRadius: "10px",
      boxShadow: "0 0 12px rgba(0,0,0,0.08)",
    },
    title: {
      fontSize: "1.5rem",
      fontWeight: "600",
      marginBottom: "25px",
      textAlign: "center",
    },
    submitBtn: {
      marginTop: "20px",
      padding: "10px",
      fontWeight: "500",
    },
  };

  return (
    <>
      <DoctorNavbar />
      <Container style={styles.wrapper}>
        <Row className="justify-content-center">
          <Col md={6} lg={5}>
            <Card style={styles.card}>
              <h3 style={styles.title}>Doctor Login</h3>

              {error && <Alert variant="danger">{error}</Alert>}

              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Email Address</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={credentials.email}
                    onChange={handleChange}
                    required
                    placeholder="Enter your email"
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    value={credentials.password}
                    onChange={handleChange}
                    required
                    placeholder="Enter your password"
                  />
                </Form.Group>

                <Button type="submit" variant="primary" className="w-100" style={styles.submitBtn}>
                  Login
                </Button>
              </Form>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default DoctorLogin;
