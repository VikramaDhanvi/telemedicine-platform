const jwt = require("jsonwebtoken");

const authenticateDoctor = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Access denied. No token provided." });
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.doctor = decoded; // Add doctor info to request object
    next();
  } catch (err) {
    return res.status(400).json({ error: "Invalid token." });
  }
};

module.exports = authenticateDoctor;
