import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// ✅ Doctor Pages (Only active + created ones)
import 'bootstrap/dist/css/bootstrap.min.css'; // ✅ Add this line
import AdminDashboard from "./Admin/Dashboard";
import VerifyDoctor from "./Admin/VerifyDoctor";



import DoctorSignup from "./doctor/pages/DoctorApplication";
import DoctorLogin from "./doctor/pages/Login";
import DoctorDashboard from "./doctor/pages/Dashboard";
import DoctorConsultation from "./doctor/pages/Consultation";
import DoctorPrescription from "./doctor/pages/Prescription";
import Patients from "./Admin/Patients";
import PaymentHistory from "./Admin/PaymentHistory";
import DoctorAppointments from "./doctor/pages/Appointments"; // ✅ import the new page

// ✅ Doctor Components (created and reusable)
import DoctorNavbar from "./doctor/components/Navbar";
import DashboardSidebar from "./doctor/components/DashboardSidebar";
import AppointmentCard from "./doctor/components/AppointmentCard";
import PatientList from "./doctor/components/PatientList";

// ✅ Patient Pages
import PatientLogin from "./patient/pages/Login";
import PatientSignup from "./patient/pages/Signup";
import PatientDashboard from "./patient/pages/Dashboard";
import BookAppointment from "./patient/pages/BookAppointment";
import AppointmentHistory from "./patient/pages/AppointmentHistory";
// import PatientConsultation from "./patient/pages/Consultation";
import PatientPrescription from "./patient/pages/Prescription";
import PatientPaymentHistory from "./patient/pages/PaymentHistory";
import PatientSymptomChecker from "./patient/pages/SymptomChecker";
import PatientProfile from "./patient/pages/Profile";

// ✅ Home Page (Landing for Doctor/Patient)
import AdminHome from "./Admin/home";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* ✅ Redirect root to homepage */}
        <Route path="/" element={<Navigate to="/admin" replace />} />
        <Route path="/Admin/Dashboard" element={<AdminDashboard />} />
        <Route path="/Admin/patients" element={<Patients />} />
        <Route path="/admin/payment-history/:patientId" element={<PaymentHistory />} />
        <Route path="/admin/verify/:id" element={<VerifyDoctor />} />


        
        

        {/* ✅ Home (Landing page for doctor/patient choice) */}
        <Route path="/admin" element={<AdminHome />} />

        {/* ✅ Active Doctor route: Application form */}
        <Route path="/doctor/signup" element={<DoctorSignup />} />

        {/* === Doctor Routes === */}
        <Route path="/doctor/login" element={<DoctorLogin />} />
        <Route path="/doctor/dashboard" element={<DoctorDashboard />} />
        {/* <Route path="/doctor/appointments" element={<DoctorAppointments />} /> */}
        <Route path="/doctor/consultation" element={<DoctorConsultation />} />
        <Route path="/doctor/prescription" element={<DoctorPrescription />} />
        <Route path="/doctor/appointments" element={<DoctorAppointments />} /> ✅

        {/* <Route path="/doctor/payment-history" element={<DoctorPaymentHistory />} /> */}

        {/* === Patient Routes (Commented for future) === */}
        <Route path="/patient/login" element={<PatientLogin />} />
        <Route path="/patient/signup" element={<PatientSignup />} />
        <Route path="/patient/dashboard" element={<PatientDashboard />} />
        <Route path="/patient/book-appointment" element={<BookAppointment />} />
        <Route path="/patient/appointment-history" element={<AppointmentHistory />} />
        {/* <Route path="/patient/consultation" element={<PatientConsultation />} /> */}
        <Route path="/patient/prescription" element={<PatientPrescription />} />
        <Route path="/patient/payment-history" element={<PatientPaymentHistory />} />
        <Route path="/patient/symptom-checker" element={<PatientSymptomChecker />} />
        <Route path="/patient/profile" element={<PatientProfile />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
