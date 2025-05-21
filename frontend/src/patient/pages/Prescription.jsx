import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const PatientPrescription = () => {
  const [prescriptions, setPrescriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPrescriptions = async () => {
      try {
        const token = localStorage.getItem("patientToken");
        const res = await axios.get(`http://localhost:5000/api/patient/prescriptions/all?ts=${Date.now()}`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        setPrescriptions(res.data);
      } catch (err) {
        console.error("❌ Failed to load prescriptions:", err);
        setError("Failed to load prescriptions. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchPrescriptions();
  }, []);

  const handleGoToPayment = (prescriptionId) => {
    navigate(`/patient/payment-history?prescriptionId=${prescriptionId}`);
  };

  return (
    <div className="container py-4">
      <h2 className="mb-4 text-primary">My Prescriptions</h2>

      {loading ? (
        <div className="d-flex justify-content-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : error ? (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      ) : prescriptions.length === 0 ? (
        <p className="text-muted">No prescriptions found.</p>
      ) : (
        prescriptions.map((prescription) => (
          <div className="card mb-4 shadow-sm" key={prescription._id}>
            <div className="card-body">
              <h5 className="card-title">{prescription.doctorName || "Doctor"}</h5>
              <h6 className="card-subtitle mb-2 text-muted">
                {prescription.specialty || "General"} | {new Date(prescription.createdAt).toLocaleDateString()}
              </h6>
              <p><strong>Diagnosis:</strong> {prescription.diagnosis}</p>

              <p className="mb-1"><strong>Medications:</strong></p>
              <ul>
                {(prescription.medications || []).map((med, idx) => (
                  <li key={`${prescription._id}-${idx}`}>
                    {med.name} - {med.dosage}, {med.frequency} for {med.duration}
                  </li>
                ))}
              </ul>

              <p><strong>Doctor Notes:</strong> {prescription.notes || "None"}</p>

              {!prescription.paid ? (
                <button
                  className="btn btn-warning btn-sm mt-2"
                  onClick={() => handleGoToPayment(prescription._id)}
                >
                  Proceed to Payment
                </button>
              ) : (
                <span className="badge bg-success mt-2">Paid</span>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default PatientPrescription;
