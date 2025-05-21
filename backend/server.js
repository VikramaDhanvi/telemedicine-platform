const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

// Initialize express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Serve static files (e.g. uploaded PDFs)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Root health check route
app.get('/', (req, res) => {
  res.send('API is running...');
});

// =================== ROUTES =================== //

// Doctor routes
app.use('/api/doctor/auth', require('./routes/doctor/authRoutes'));
app.use('/api/doctor/admin/doctors', require('./routes/doctor/adminDoctorRoutes'));
app.use('/api/doctor/appointments', require('./routes/doctor/appointmentRoutes'));
app.use('/api/doctor/prescriptions', require('./routes/doctor/prescriptionRoutes'));
app.use('/api/doctor', require('./routes/doctor/applicationRoutes'));

// Patient routes
app.use('/api/patient/auth', require('./routes/patient/authRoutes'));
app.use('/api/patient/dashboard', require('./routes/patient/dashboardRoutes'));
app.use('/api/patient/profile', require('./routes/patient/profileRoutes'));
app.use('/api/patient/appointments', require('./routes/patient/appointmentRoutes'));
app.use('/api/patient/prescriptions', require('./routes/patient/prescriptionRoutes')); // ✅ ADDED

// Admin routes
app.use('/api/admin/dashboard', require('./routes/admin/dashboardRoutes'));
app.use("/api/patient/appointments", require("./routes/patient/appointmentRoutes"));
app.use("/api/patient/profile", require("./routes/patient/profileRoutes"));
app.use('/api/patient/appointments', require('./routes/patient/appointmentRoutes'));
app.use("/api/doctor", require("./routes/doctor/dashboardRoutes"));

// ============================================== //

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
