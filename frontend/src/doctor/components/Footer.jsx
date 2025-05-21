import React from "react";
import { Table, Button } from "react-bootstrap";

const PatientList = ({ patients = [], onViewPatient }) => {
  const styles = {
    title: {
      marginBottom: "1rem",
      fontSize: "1.2rem",
      fontWeight: "600",
    },
    table: {
      fontSize: "0.95rem",
    },
    actionButton: {
      fontSize: "0.85rem",
      padding: "4px 10px",
    },
    emptyRow: {
      textAlign: "center",
      fontStyle: "italic",
      color: "#6c757d",
    }
  };

  return (
    <div>
      <h5 style={styles.title}>Patient List</h5>
      <Table striped bordered hover responsive style={styles.table}>
        <thead className="table-dark">
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Age</th>
            <th>Gender</th>
            <th>Last Appointment</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {patients.length === 0 ? (
            <tr>
              <td colSpan="6" style={styles.emptyRow}>No patients found.</td>
            </tr>
          ) : (
            patients.map((patient, index) => (
              <tr key={patient.id || index}>
                <td>{index + 1}</td>
                <td>{patient.name}</td>
                <td>{patient.age}</td>
                <td>{patient.gender}</td>
                <td>{patient.lastAppointmentDate}</td>
                <td>
                  <Button
                    variant="primary"
                    size="sm"
                    style={styles.actionButton}
                    onClick={() => onViewPatient(patient)}
                  >
                    View
                  </Button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
    </div>
  );
};

export default PatientList;
