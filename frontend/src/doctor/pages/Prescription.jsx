import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  Container,
  Form,
  Button,
  Card,
  Row,
  Col,
  Table,
  Alert,
} from "react-bootstrap";
import axios from "axios";
import DoctorNavbar from "../components/Navbar";

const medicineList = [
  "Paracetamol", "Amoxicillin", "Ibuprofen", "Cetirizine",
  "Azithromycin", "Pantoprazole", "Metformin", "Atorvastatin",
  "Levocetirizine", "Dolo 650",
];

const Prescription = () => {
  const location = useLocation();
  const [patientName, setPatientName] = useState("");
  const [patientId, setPatientId] = useState("");

  const [diagnosis, setDiagnosis] = useState("");
  const [doctorNotes, setDoctorNotes] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredMeds, setFilteredMeds] = useState(medicineList);

  const [selectedMed, setSelectedMed] = useState("");
  const [dosage, setDosage] = useState("");
  const [frequency, setFrequency] = useState("");
  const [duration, setDuration] = useState("");

  const [prescribedList, setPrescribedList] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // ✅ Extract patientName and ID from URL
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const name = queryParams.get("patient") || "Patient";
    const id = queryParams.get("id") || "";

    console.log("📥 Extracted from URL — patientId:", id);

    setPatientName(name);
    setPatientId(id);
  }, [location.search]);

  useEffect(() => {
    const filtered = medicineList.filter((med) =>
      med.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredMeds(filtered);
  }, [searchTerm]);

  const handleAddMedicine = () => {
    if (!selectedMed || !dosage || !frequency || !duration) return;
    setPrescribedList((prev) => [
      ...prev,
      { name: selectedMed, dosage, frequency, duration },
    ]);
    setSelectedMed("");
    setDosage("");
    setFrequency("");
    setDuration("");
    setSearchTerm("");
  };

  const handleRemoveMedicine = (index) => {
    const newList = [...prescribedList];
    newList.splice(index, 1);
    setPrescribedList(newList);
  };

  const handleSubmitPrescription = async () => {
    setError("");
    setSuccess("");

    console.log("🔍 Submitting prescription with:");
    console.log("Patient ID:", patientId);
    console.log("Diagnosis:", diagnosis);
    console.log("Doctor Notes:", doctorNotes);
    console.log("Prescribed Meds:", prescribedList);

    if (!patientId || patientId.length !== 24) {
      setError("Invalid or missing patient ID.");
      return;
    }

    if (!diagnosis || !doctorNotes || prescribedList.length === 0) {
      setError("Please fill out all required fields.");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:5000/api/doctor/prescriptions/create",
        {
          patientId,
          diagnosis,
          medications: prescribedList,
          notes: doctorNotes,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("doctorToken")}`,
          },
        }
      );

      if (res.status === 201) {
        setSuccess("Prescription sent to patient!");
        setPrescribedList([]);
        setDiagnosis("");
        setDoctorNotes("");
      }
    } catch (err) {
      console.error("❌ Error submitting prescription:", err.response?.data || err.message);
      setError(err.response?.data?.message || "Failed to send prescription.");
    }
  };

  return (
    <>
      <DoctorNavbar />
      <Container style={{ marginTop: "60px" }}>
        <Card style={{ padding: "30px" }}>
          <h4 className="mb-4">Prescription for {patientName}</h4>

          {error && <Alert variant="danger">{error}</Alert>}
          {success && <Alert variant="success">{success}</Alert>}

          <Form.Group className="mb-3">
            <Form.Label><strong>Diagnosis</strong></Form.Label>
            <Form.Control
              type="text"
              placeholder="e.g., Fungal infection"
              value={diagnosis}
              onChange={(e) => setDiagnosis(e.target.value)}
              required
            />
          </Form.Group>

          <Row className="align-items-end mb-4">
            <Col md={4}>
              <Form.Group>
                <Form.Label>Search Medicine</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Type to search..."
                  value={selectedMed || searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setSelectedMed("");
                  }}
                />
              </Form.Group>

              {searchTerm && !selectedMed && (
                <div className="border p-2 mt-1" style={{ maxHeight: "120px", overflowY: "auto" }}>
                  {filteredMeds.map((med, idx) => (
                    <div
                      key={med + idx}
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        setSelectedMed(med);
                        setSearchTerm("");
                      }}
                    >
                      {med}
                    </div>
                  ))}
                </div>
              )}
            </Col>

            <Col md={2}>
              <Form.Group>
                <Form.Label>Dosage</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="e.g., 500mg"
                  value={dosage}
                  onChange={(e) => setDosage(e.target.value)}
                />
              </Form.Group>
            </Col>

            <Col md={3}>
              <Form.Group>
                <Form.Label>Frequency</Form.Label>
                <Form.Select
                  value={frequency}
                  onChange={(e) => setFrequency(e.target.value)}
                >
                  <option value="">Select</option>
                  <option>Once a day</option>
                  <option>Twice a day</option>
                  <option>Three times a day</option>
                  <option>Before bed</option>
                </Form.Select>
              </Form.Group>
            </Col>

            <Col md={2}>
              <Form.Group>
                <Form.Label>Duration</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="e.g., 5 days"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                />
              </Form.Group>
            </Col>

            <Col md={1}>
              <Button variant="primary" onClick={handleAddMedicine}>
                Add
              </Button>
            </Col>
          </Row>

          <Form.Group className="mb-4">
            <Form.Label><strong>Doctor Notes</strong></Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Any advice or observations..."
              value={doctorNotes}
              onChange={(e) => setDoctorNotes(e.target.value)}
              required
            />
          </Form.Group>

          {prescribedList.length > 0 && (
            <Table bordered>
              <thead>
                <tr>
                  <th>Medicine</th>
                  <th>Dosage</th>
                  <th>Frequency</th>
                  <th>Duration</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {prescribedList.map((med, idx) => (
                  <tr key={`${med.name}-${idx}`}>
                    <td>{med.name}</td>
                    <td>{med.dosage}</td>
                    <td>{med.frequency}</td>
                    <td>{med.duration}</td>
                    <td>
                      <Button variant="danger" size="sm" onClick={() => handleRemoveMedicine(idx)}>
                        Remove
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}

          <Button variant="success" onClick={handleSubmitPrescription}>
            Send Prescription
          </Button>
        </Card>
      </Container>
    </>
  );
};

export default Prescription;
