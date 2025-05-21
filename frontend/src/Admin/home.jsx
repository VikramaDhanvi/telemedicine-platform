import React from "react";
import { Container, Button, Row, Col, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <Container className="text-center mt-5">
      <h1 className="mb-4">Welcome to the Telemedicine Platform</h1>
      <p className="lead">Please select your role to continue</p>

      <Row className="justify-content-center mt-5">
        <Col md={4}>
          <Card className="shadow p-3 mb-5">
            <Card.Img
              variant="top"
              src="https://cdn-icons-png.flaticon.com/512/3774/3774299.png"
              style={{ width: "100px", margin: "20px auto" }}
            />
            <Card.Body>
              <Card.Title>Doctor</Card.Title>
              <Card.Text>
                Access your appointments, consultations, and prescriptions.
              </Card.Text>
              <Button
                variant="primary"
                onClick={() => navigate("/doctor/login")}
              >
                Login as Doctor
              </Button>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card className="shadow p-3 mb-5">
            <Card.Img
              variant="top"
              src="https://cdn-icons-png.flaticon.com/512/4320/4320337.png"
              style={{ width: "100px", margin: "20px auto" }}
            />
            <Card.Body>
              <Card.Title>Patient</Card.Title>
              <Card.Text>
                Book appointments, view prescriptions, and track health.
              </Card.Text>
              <Button
                variant="success"
                onClick={() => navigate("/patient/login")}
              >
                Login as Patient
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
