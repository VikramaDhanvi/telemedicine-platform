const jwt = require("jsonwebtoken");
const Doctor = require("../models/doctor/Doctor"); // Adjust this if your Doctor model path is different

async function verifyToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized. Missing or malformed token." });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // ✅ Get doctor info from DB using ID in token
    const doctor = await Doctor.findById(decoded.id).select("name email specialization");
    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found." });
    }

    req.user = {
      id: doctor._id,
      name: doctor.name,
      email: doctor.email,
      specialty: doctor.specialization,
      role: "doctor",
    };

    next();
  } catch (err) {
    console.error("JWT verification error:", err.message);
    return res.status(403).json({ message: "Forbidden. Invalid or expired token." });
  }
}

function authorizeRole(expectedRole) {
  return (req, res, next) => {
    if (!req.user || req.user.role !== expectedRole) {
      return res.status(403).json({ message: "Access denied. Insufficient role." });
    }
    next();
  };
}

module.exports = {
  verifyToken,
  authorizeRole,
};
