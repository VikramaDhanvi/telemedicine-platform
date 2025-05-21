import React from "react";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const PatientNavbar = () => {
  const navigate = useNavigate();
  const patientToken = localStorage.getItem("patientToken");

  const styles = {
    brand: {
      cursor: "pointer",
      fontWeight: "600",
      fontSize: "1.2rem",
    },
    navLink: {
      marginLeft: "10px",
    },
  };

  const handleLogout = () => {
    localStorage.removeItem("patientToken");
    navigate("/patient/login");
  };

  return (
    <Navbar bg="light" expand="lg" className="shadow-sm">
      <Container>
        <Navbar.Brand
          onClick={() => navigate("/patient/dashboard")}
          style={styles.brand}
        >
          🩺 TeleCare Patient
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="patient-navbar" />
        {patientToken && (
          <Navbar.Collapse id="patient-navbar">
            <Nav className="ms-auto align-items-center">
              <Nav.Link
                style={styles.navLink}
                onClick={() => navigate("/patient/dashboard")}
              >
                Dashboard
              </Nav.Link>
              <Nav.Link
                style={styles.navLink}
                onClick={() => navigate("/patient/book-appointment")}
              >
                Book Appointment
              </Nav.Link>
              <Nav.Link
                style={styles.navLink}
                onClick={() => navigate("/patient/appointment-history")}
              >
                Appointments
              </Nav.Link>
              <Nav.Link
                style={styles.navLink}
                onClick={() => navigate("/patient/prescription")}
              >
                Prescriptions
              </Nav.Link>
              <Nav.Link
                style={styles.navLink}
                onClick={() => navigate("/patient/payment-history")}
              >
                Payments
              </Nav.Link>
              <Nav.Link
                style={styles.navLink}
                onClick={() => navigate("/patient/symptom-checker")}
              >
                Symptom Checker
              </Nav.Link>
              <Button
                variant="outline-danger"
                size="sm"
                className="ms-3"
                onClick={handleLogout}
              >
                Logout
              </Button>
            </Nav>
          </Navbar.Collapse>
        )}
      </Container>
    </Navbar>
  );
};

export default PatientNavbar;
