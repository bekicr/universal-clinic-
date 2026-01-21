const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

// Middleware: Verifies JWT and loads the user record onto req.user
// - Expects header: Authorization: Bearer <token>
const authenticate = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.startsWith("Bearer ")
    ? authHeader.split(" ")[1]
    : null;

  if (!token) return res.status(401).json({ error: "Authorization token missing" });

  try {
    if (!process.env.JWT_SECRET) {
      return res.status(500).json({ error: "Server misconfigured (JWT_SECRET missing)" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Load the latest user from DB (don’t trust role only from token).
    const user = await User.findById(decoded.id).select("name email role");

    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }

    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
};

// Middleware factory: Ensures the authenticated user has one of the required roles.
// Roles are expected to be uppercase strings: "ADMIN", "PATIENT".
const requireRole = (...roles) => (req, res, next) => {
  if (!req.user) return res.status(401).json({ error: "Unauthorized" });
  if (!roles.includes(req.user.role)) {
    return res.status(403).json({ error: "Forbidden: insufficient role" });
  }
  next();
};

module.exports = {
  authenticate,
  requireRole,
};
