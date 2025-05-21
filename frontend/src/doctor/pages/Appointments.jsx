import React, { useEffect, useState } from "react";
import { Container, Table, Spinner, Alert, Card } from "react-bootstrap";
import axios from "axios";
import DoctorNavbar from "../components/Navbar";

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAppointments = async () => {
      const token = localStorage.getItem("doctorToken");
      if (!token) {
        setError("Unauthorized. Please log in.");
        setLoading(false);
        return;
      }

      try {
        const res = await axios.get("http://localhost:5000/api/doctor/appointments/history", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setAppointments(res.data);
      } catch (err) {
        setError("Failed to load appointments.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  return (
    <>
      <DoctorNavbar />
      <Container className="mt-5 mb-5">
        <Card className="p-4 shadow-sm">
          <h3 className="mb-4 text-center">Past Appointments</h3>

          {loading ? (
            <div className="text-center">
              <Spinner animation="border" />
            </div>
          ) : error ? (
            <Alert variant="danger">{error}</Alert>
          ) : appointments.length === 0 ? (
            <Alert variant="info">No past appointments found.</Alert>
          ) : (
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Patient</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Symptoms</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {appointments.map((appt, index) => (
                  <tr key={appt._id}>
                    <td>{index + 1}</td>
                    <td>{appt.patientName}</td>
                    <td>{new Date(appt.date).toLocaleDateString()}</td>
                    <td>{appt.time}</td>
                    <td>{appt.symptoms}</td>
                    <td>{appt.status}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Card>
      </Container>
    </>
  );
};

export default Appointments;
