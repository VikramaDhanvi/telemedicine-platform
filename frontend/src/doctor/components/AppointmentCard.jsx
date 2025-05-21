import React from "react";
import { Card, Button } from "react-bootstrap";

const AppointmentCard = ({ appointment, onAccept, onReject }) => {
  const {
    patientName,
    date,
    time,
    symptoms,
    status,
  } = appointment;

  const styles = {
    card: {
      marginBottom: "20px",
      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
      borderRadius: "10px",
    },
    title: {
      fontSize: "1.2rem",
      fontWeight: "600",
    },
    subtitle: {
      fontSize: "0.95rem",
      color: "#6c757d",
    },
    text: {
      fontSize: "0.95rem",
    },
    buttonGroup: {
      display: "flex",
      gap: "10px",
      marginTop: "10px",
    },
  };

  return (
    <Card style={styles.card}>
      <Card.Body>
        <Card.Title style={styles.title}>{patientName}</Card.Title>
        <Card.Subtitle className="mb-2" style={styles.subtitle}>
          {date} at {time}
        </Card.Subtitle>
        <Card.Text style={styles.text}>
          <strong>Symptoms:</strong> {symptoms}
        </Card.Text>
        <Card.Text style={styles.text}>
          <strong>Status:</strong> {status}
        </Card.Text>
        {status === "Pending" && (
          <div style={styles.buttonGroup}>
            <Button variant="success" onClick={() => onAccept(appointment)}>Accept</Button>
            <Button variant="danger" onClick={() => onReject(appointment)}>Reject</Button>
          </div>
        )}
      </Card.Body>
    </Card>
  );
};

export default AppointmentCard;
