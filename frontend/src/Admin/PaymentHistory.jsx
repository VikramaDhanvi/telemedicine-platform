import React from "react";
import { useParams } from "react-router-dom";
import { Container, Card, Table } from "react-bootstrap";

const PaymentHistory = () => {
  const { patientId } = useParams();

  // Mock payment records
  const payments = [
    { date: "2025-01-15", amount: "₹1200", status: "Paid" },
    { date: "2025-02-20", amount: "₹800", status: "Paid" },
    { date: "2025-03-05", amount: "₹600", status: "Pending" },
  ];

  return (
    <Container className="mt-5 mb-5">
      <h3 className="mb-4 text-center">Payment History: {patientId}</h3>

      <Card className="p-3 shadow-sm">
        <Table bordered striped hover responsive>
          <thead>
            <tr>
              <th>Date</th>
              <th>Amount</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment, index) => (
              <tr key={index}>
                <td>{payment.date}</td>
                <td>{payment.amount}</td>
                <td>{payment.status}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card>
    </Container>
  );
};

export default PaymentHistory;
