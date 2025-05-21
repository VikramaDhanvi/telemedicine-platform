import React from "react";
import { ListGroup } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const PatientSidebar = () => {
  const navigate = useNavigate();

  const styles = {
    item: {
      cursor: "pointer",
      fontWeight: "500",
    },
  };

  return (
    <ListGroup className="shadow-sm">
      <ListGroup.Item style={styles.item} onClick={() => navigate("/patient/dashboard")}>
        Dashboard
      </ListGroup.Item>
      <ListGroup.Item style={styles.item} onClick={() => navigate("/patient/book-appointment")}>
        Book Appointment
      </ListGroup.Item>
      <ListGroup.Item style={styles.item} onClick={() => navigate("/patient/appointment-history")}>
        Appointment History
      </ListGroup.Item>
      <ListGroup.Item style={styles.item} onClick={() => navigate("/patient/prescription")}>
        Prescriptions
      </ListGroup.Item>
      <ListGroup.Item style={styles.item} onClick={() => navigate("/patient/payment-history")}>
        Payment History
      </ListGroup.Item>
    </ListGroup>
  );
};

export default PatientSidebar;
