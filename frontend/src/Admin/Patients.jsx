import React from "react";
import { Container, Table, Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Patients = () => {
  const navigate = useNavigate();

  // Mock data
  const patients = [
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
  ];

  return (
    <Container className="mt-5 mb-5">
      <h3 className="mb-4 text-center">All Patients</h3>

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
            {patients.map((p, index) => (
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
            ))}
          </tbody>
        </Table>
      </Card>
    </Container>
  );
};

export default Patients;
