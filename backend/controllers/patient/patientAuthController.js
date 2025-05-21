const Patient = require("../../models/patient/Patient");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Patient Signup
exports.signupPatient = async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      password,
      gender,
      dateOfBirth,
      address,
      bloodGroup,
    } = req.body;

    if (!name || !email || !phone || !password || !gender || !dateOfBirth || !address || !bloodGroup) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const exists = await Patient.findOne({ email });
    if (exists) {
      return res.status(409).json({ message: "Email already exists." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await Patient.create({
      name,
      email,
      phone,
      password: hashedPassword,
      gender,
      dateOfBirth,
      address,
      bloodGroup,
    });

    res.status(201).json({ message: "Patient registered successfully." });
  } catch (err) {
    console.error("Signup Error:", err);
    res.status(500).json({ message: "Patient signup failed.", error: err.message });
  }
};

// Patient Login
exports.loginPatient = async (req, res) => {
  const { email, password } = req.body;

  try {
    const patient = await Patient.findOne({ email });
    if (!patient) {
      return res.status(404).json({ message: "Patient not found." });
    }

    const isMatch = await bcrypt.compare(password, patient.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials." });
    }

    const token = jwt.sign({ id: patient._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.status(200).json({
      token,
      patient: {
        id: patient._id,
        name: patient.name,
        email: patient.email,
        phone: patient.phone,
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Login failed", error: err.message });
  }
};

// Patient Count (Admin Dashboard)
exports.getPatientCount = async (req, res) => {
  try {
    const count = await Patient.countDocuments();
    res.status(200).json({ count });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch patient count." });
  }
};
