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
      marginBottom: "1rem",
      borderRadius: "10px",
      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
      border: "1px solid #e0e0e0",
    },
    title: {
      fontSize: "1.25rem",
      fontWeight: "600",
    },
    subtitle: {
      fontSize: "0.95rem",
      color: "#6c757d",
    },
    text: {
      fontSize: "0.95rem",
      marginBottom: "0.5rem",
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
        <Card.Subtitle style={styles.subtitle}>
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
