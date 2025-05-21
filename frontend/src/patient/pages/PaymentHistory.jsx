import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const PaymentHistory = () => {
  const [completedPayments, setCompletedPayments] = useState([]);
  const [upcomingPayments, setUpcomingPayments] = useState([]);
  const [activeTab, setActiveTab] = useState("upcoming");

  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const prescriptionId = params.get("prescriptionId");

  useEffect(() => {
    // You can use prescriptionId here to filter or fetch related data
    console.log("Prescription ID from query:", prescriptionId);

    // Mock data for now
    const mockCompleted = [
      {
        id: 1,
        date: "2025-03-30",
        doctor: "Dr. Anil Kumar",
        amount: "₹500",
        method: "UPI",
        status: "Paid"
      },
      {
        id: 2,
        date: "2025-04-01",
        doctor: "Dr. Meera Das",
        amount: "₹750",
        method: "Card",
        status: "Paid"
      }
    ];

    const mockUpcoming = [
      {
        id: 3,
        date: "2025-04-10",
        doctor: "Dr. Priya Sharma",
        amount: "₹600",
        method: "Not Paid",
        status: "Pending"
      }
    ];

    setCompletedPayments(mockCompleted);
    setUpcomingPayments(mockUpcoming);
  }, [prescriptionId]);

  const handlePayNow = (id) => {
    alert(`Redirecting to payment gateway for appointment ID: ${id}`);
    // Later, integrate real payment flow
  };

  const renderTable = (data, type) => (
    <div className="table-responsive">
      <table className="table table-bordered table-striped">
        <thead className="table-dark">
          <tr>
            <th>Date</th>
            <th>Doctor</th>
            <th>Amount</th>
            <th>Method</th>
            <th>Status</th>
            {type === "upcoming" && <th>Action</th>}
          </tr>
        </thead>
        <tbody>
          {data.map((payment) => (
            <tr key={payment.id}>
              <td>{payment.date}</td>
              <td>{payment.doctor}</td>
              <td>{payment.amount}</td>
              <td>{payment.method}</td>
              <td>
                <span
                  className={`badge ${
                    payment.status === "Paid" ? "bg-success" : "bg-warning text-dark"
                  }`}
                >
                  {payment.status}
                </span>
              </td>
              {type === "upcoming" && (
                <td>
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() => handlePayNow(payment.id)}
                  >
                    Pay Now
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="container py-4">
      <h2 className="mb-4 text-primary">Payment History</h2>

      <ul className="nav nav-tabs mb-4">
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "upcoming" ? "active" : ""}`}
            onClick={() => setActiveTab("upcoming")}
          >
            Upcoming Payments
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "completed" ? "active" : ""}`}
            onClick={() => setActiveTab("completed")}
          >
            Completed Payments
          </button>
        </li>
      </ul>

      {activeTab === "upcoming"
        ? renderTable(upcomingPayments, "upcoming")
        : renderTable(completedPayments, "completed")}
    </div>
  );
};

export default PaymentHistory;
