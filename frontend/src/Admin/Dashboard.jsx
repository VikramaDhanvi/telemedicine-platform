import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Table,
  Badge,
  Button,
  Spinner,
  Alert,
  Form,
  Modal,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AdminDashboard = () => {
  const navigate = useNavigate();

  const [doctorApplications, setDoctorApplications] = useState([]);
  const [approvedDoctors, setApprovedDoctors] = useState([]);
  const [patientCount, setPatientCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showResetModal, setShowResetModal] = useState(false);
  const [resetDoctorId, setResetDoctorId] = useState(null);
  const [newPassword, setNewPassword] = useState("");
  const [resetError, setResetError] = useState("");
  const [resetSuccess, setResetSuccess] = useState("");

  const styles = {
    cardTitle: { fontSize: "1.1rem", fontWeight: "600" },
    tableHead: { backgroundColor: "#343a40", color: "#fff" },
    sectionTitle: { fontSize: "1.3rem", fontWeight: "600", margin: "30px 0 15px" },
  };

  const fetchData = async () => {
    try {
      const [appsRes, docsRes, patientRes] = await Promise.all([
        axios.get("http://localhost:5000/api/doctor/admin/applications"),
        axios.get("http://localhost:5000/api/doctor/admin/doctors/all"),
        axios.get("http://localhost:5000/api/admin/dashboard/patient-count"),
      ]);
      setDoctorApplications(appsRes.data);
      setApprovedDoctors(docsRes.data);
      setPatientCount(patientRes.data.count);
    } catch (err) {
      setError("Failed to load data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handlePasswordReset = async () => {
    try {
      setResetError("");
      const res = await axios.post(
        `http://localhost:5000/api/doctor/admin/doctors/reset-password/${resetDoctorId}`,
        { password: newPassword }
      );
      setResetSuccess("Password reset successfully!");
      setTimeout(() => {
        setShowResetModal(false);
        setNewPassword("");
        setResetSuccess("");
        fetchData();
      }, 1500);
    } catch (err) {
      setResetError("Password reset failed.");
    }
  };

  const handleReject = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/doctor/admin/applications/${id}`);
      setDoctorApplications((prev) => prev.filter((doc) => doc._id !== id));
    } catch (err) {
      alert("Failed to reject application");
    }
  };

  return (
    <Container className="mt-5 mb-5">
      <h2 className="mb-4 text-center">Admin Dashboard</h2>

      <Row className="mb-4">
        <Col md={4}>
          <Card bg="primary" text="white" className="mb-3 shadow">
            <Card.Body>
              <Card.Title style={styles.cardTitle}>Doctors</Card.Title>
              <Card.Text style={{ fontSize: "1.8rem" }}>{approvedDoctors.length}</Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card bg="success" text="white" className="mb-3 shadow">
            <Card.Body>
              <Card.Title style={styles.cardTitle}>Patients</Card.Title>
              <Card.Text style={{ fontSize: "1.8rem" }}>{patientCount}</Card.Text>
              <Button variant="light" size="sm" onClick={() => navigate("/admin/patients")}>
                View Patients
              </Button>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card bg="dark" text="white" className="mb-3 shadow">
            <Card.Body>
              <Card.Title style={styles.cardTitle}>Pharmacies</Card.Title>
              <Card.Text style={{ fontSize: "1.8rem" }}>--</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <h4 style={styles.sectionTitle}>Doctor Applications</h4>
      {loading ? (
        <div className="text-center">
          <Spinner animation="border" />
        </div>
      ) : error ? (
        <Alert variant="danger">{error}</Alert>
      ) : (
        <Table striped bordered hover responsive>
          <thead style={styles.tableHead}>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Specialization</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {doctorApplications.map((doc, index) => (
              <tr key={doc._id}>
                <td>{index + 1}</td>
                <td>{doc.name}</td>
                <td>{doc.email}</td>
                <td>{doc.specialization}</td>
                <td>
                  <Badge
                    bg={
                      doc.status === "Approved"
                        ? "success"
                        : doc.status === "Rejected"
                        ? "danger"
                        : "warning"
                    }
                  >
                    {doc.status}
                  </Badge>
                </td>
                <td>
                  {doc.status === "Pending" ? (
                    <>
                      <Button
                        variant="outline-success"
                        size="sm"
                        className="me-2"
                        onClick={() => navigate(`/admin/verify/${doc._id}`)}
                      >
                        Verify & Approve
                      </Button>
                      <Button
                        variant="outline-danger"
                        size="sm"
                        onClick={() => handleReject(doc._id)}
                      >
                        Reject
                      </Button>
                    </>
                  ) : (
                    <small className="text-muted">No actions</small>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      <h4 style={styles.sectionTitle}>Approved Doctors</h4>
      <Table striped bordered hover responsive>
        <thead style={styles.tableHead}>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Specialization</th>
            <th>Password (Encrypted)</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {approvedDoctors.map((doc, index) => (
            <tr key={doc._id}>
              <td>{index + 1}</td>
              <td>{doc.name}</td>
              <td>{doc.email}</td>
              <td>{doc.specialization}</td>
              <td>{doc.password}</td>
              <td>
                <Button
                  variant="outline-primary"
                  size="sm"
                  onClick={() => {
                    setResetDoctorId(doc._id);
                    setShowResetModal(true);
                  }}
                >
                  Reset Password
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showResetModal} onHide={() => setShowResetModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Reset Doctor Password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>New Password</Form.Label>
              <Form.Control
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter new password"
              />
            </Form.Group>
            {resetError && <Alert variant="danger" className="mt-2">{resetError}</Alert>}
            {resetSuccess && <Alert variant="success" className="mt-2">{resetSuccess}</Alert>}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowResetModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handlePasswordReset}>
            Reset Password
          </Button>
        </Modal.Footer>
      </Modal>

      <h4 style={styles.sectionTitle}>Pharmacy Management (Coming Soon)</h4>
      <Card className="shadow-sm p-3">
        <p>Pharmacy listings and controls will be added here to manage medicines and stock.</p>
      </Card>
    </Container>
  );
};

export default AdminDashboard;
