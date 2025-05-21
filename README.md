# Telemedicine Platform

A full-stack web application that enables remote healthcare consultations between patients and doctors. This system allows patients to book appointments, doctors to manage consultations and prescriptions, and admins to oversee the platform. Built using **React (Vite)** for the frontend, **Node.js + Express** for the backend, and **MongoDB** for data storage.

## 🌐 Features

### 👨‍⚕️ Doctor Module
- Doctor registration with verification flow
- Secure login and authentication
- Dashboard with patient appointments
- Create and send prescriptions to patients

### 🧑‍💻 Patient Module
- Patient registration and login
- Book appointments with doctors
- View prescriptions
- Track appointment history

### 🛡️ Admin Module
- Review and approve doctor applications
- Monitor platform-wide activity
- Manage users and roles

### 🔐 Authentication
- Role-based access control
- JWT authentication for doctors, patients, and admin
- Google login integration

### 🧠 Additional Features
- Symptom checker (placeholder logic)
- Responsive UI for desktop and mobile
- Modular controller-based backend
- RESTful API design

## 🏗️ Tech Stack

### Frontend
- React (Vite)
- React Router
- Axios
- Bootstrap / Tailwind CSS

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT for authentication
- Multer for file uploads (optional image handling)

### Other Tools
- Google OAuth (Login)
- Dotenv for environment variables
- Middleware: role, token, error handling

## 🗂️ Folder Structure

telemedicine-platform/
├── backend/
│ ├── config/
│ ├── controllers/
│ ├── middlewares/
│ ├── models/
│ ├── routes/
│ ├── utils/
│ └── server.js
└── frontend/
├── src/
│ ├── doctor/
│ ├── patient/
│ ├── shared/
│ └── App.jsx, main.jsx
└── vite.config.js


## 🚀 Getting Started

### Prerequisites
- Node.js (v16+)
- MongoDB (local or Atlas)
- Git

### Setup Instructions

#### Backend

```bash
cd backend
npm install
# Create .env file with Mongo URI and JWT secret
npm start

cd frontend
npm install
npm run dev
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
GOOGLE_CLIENT_ID=your_google_oauth_client_id

