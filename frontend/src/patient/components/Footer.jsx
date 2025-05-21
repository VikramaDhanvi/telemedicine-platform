import React from "react";
import { Container } from "react-bootstrap";

const Footer = () => {
  const styles = {
    footer: {
      marginTop: "80px",
      padding: "20px 0",
      backgroundColor: "#f8f9fa",
      textAlign: "center",
      fontSize: "0.9rem",
      color: "#555",
    },
  };

  return (
    <div style={styles.footer}>
      <Container>
        &copy; {new Date().getFullYear()} TeleCare — Patient Portal. All rights reserved.
      </Container>
    </div>
  );
};

export default Footer;
