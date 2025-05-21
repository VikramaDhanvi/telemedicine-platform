import React, { useState } from "react";
import { Container, Card, Table, Button, Form, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Patients = () => {
  const navigate = useNavigate();

  // Mock patient data
  const patientsData = [
    {
      id: "P001",
      name: "Riya Mehta",
      email: "riya@example.com",
      phone: "9876543210",
      doctor: "Dr. Aarav Sharma",
    },
    {
      id: "P002",
      name: "Kunal Patel",
      email: "kunal@example.com",
      phone: "9876512345",
      doctor: "Dr. Neha Verma",
    },
    {
      id: "P003",
      name: "Anjali Rao",
      email: "anjali@example.com",
      phone: "9876123456",
      doctor: "Dr. Arjun Mehta",
    },
    {
      id: "P004",
      name: "Rakesh Gupta",
      email: "rakesh@example.com",
      phone: "9876109876",
      doctor: "Dr. Neha Verma",
    },
  ];

  const [searchTerm, setSearchTerm] = useState("");

  const filteredPatients = patientsData.filter((patient) => {
    const search = searchTerm.toLowerCase();
    return (
      patient.name.toLowerCase().includes(search) ||
      patient.email.toLowerCase().includes(search) ||
      patient.doctor.toLowerCase().includes(search)
    );
  });

  return (
    <Container className="mt-5 mb-5">
      <h3 className="mb-4 text-center">Patient Management</h3>

      {/* Search Bar */}
      <Row className="mb-3">
        <Col md={{ span: 6, offset: 3 }}>
          <Form.Control
            type="text"
            placeholder="Search by name, email, or doctor"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Col>
      </Row>

      {/* Patient Table */}
      <Card className="p-3 shadow-sm">
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Assigned Doctor</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredPatients.length > 0 ? (
              filteredPatients.map((p, index) => (
                <tr key={p.id}>
                  <td>{index + 1}</td>
                  <td>{p.name}</td>
                  <td>{p.email}</td>
                  <td>{p.phone}</td>
                  <td>{p.doctor}</td>
                  <td>
                    <Button
                      variant="info"
                      size="sm"
                      onClick={() => navigate(`/admin/payment-history/${p.id}`)}
                    >
                      View Payment History
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center text-muted">
                  No patients found.
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </Card>
    </Container>
  );
};

export default Patients;
