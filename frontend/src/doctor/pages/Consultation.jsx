import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Container, Card } from "react-bootstrap";

const Consultation = () => {
  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const patientName = queryParams.get("patient") || "Patient";
    const patientId = queryParams.get("id") || "";

    console.log("🧾 Consultation Started:", { patientName, patientId });

    // Open prescription page in new tab
    const prescriptionUrl = `/doctor/prescription?patient=${encodeURIComponent(patientName)}&id=${patientId}`;
    window.open(prescriptionUrl, "_blank");
  }, [location.search]);

  return (
    <Container style={{ marginTop: "80px" }}>
      <Card style={{ padding: "30px", textAlign: "center" }}>
        <h4>Consultation in progress...</h4>
        <p>
          The prescription page has been opened in a new tab. Continue your consultation here.
        </p>
      </Card>
    </Container>
  );
};

export default Consultation;
