import React from "react";
import { Navbar, Container, Nav, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

const DoctorNavbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("doctorToken");
    navigate("/doctor/login");
  };

  const styles = {
    brand: {
      fontWeight: "600",
      fontSize: "1.25rem",
      display: "flex",
      alignItems: "center",
      gap: "8px"
    },
    navLink: {
      fontSize: "0.95rem",
      marginRight: "12px"
    },
    logoutButton: {
      fontSize: "0.85rem",
      padding: "5px 12px",
      borderRadius: "4px"
    }
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="mb-4 shadow-sm">
      <Container>
        <Navbar.Brand as={Link} to="/doctor/dashboard" style={styles.brand}>
          🩺 Telemedicine | Doctor
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="doctor-navbar-nav" />
        <Navbar.Collapse id="doctor-navbar-nav">
          <Nav className="ms-auto align-items-center">
            <Nav.Link as={Link} to="/doctor/dashboard" style={styles.navLink}>Dashboard</Nav.Link>
            <Nav.Link as={Link} to="/doctor/appointments" style={styles.navLink}>Appointments</Nav.Link>
            <Nav.Link as={Link} to="/doctor/prescription" style={styles.navLink}>Prescriptions</Nav.Link>
            <Nav.Link as={Link} to="/doctor/payment-history" style={styles.navLink}>Payments</Nav.Link>
            <Button
              variant="outline-light"
              size="sm"
              className="ms-2"
              onClick={handleLogout}
              style={styles.logoutButton}
            >
              Logout
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default DoctorNavbar;
