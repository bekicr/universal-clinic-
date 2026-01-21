require("dotenv").config();
const express = require("express");
const cors = require("cors");

// Initialize MongoDB connection
require("./db");

// ===============================
// ENV VALIDATION
// ===============================
if (!process.env.JWT_SECRET) {
  console.error("❌ JWT_SECRET is required. Set it in Render Environment Variables.");
  process.exit(1);
}

// ===============================
// APP INIT
// ===============================
const app = express();

// ===============================
// CORS CONFIG (IMPORTANT)
// ===============================
app.use(
  cors({
    origin: [
      "http://localhost:5173", // local frontend
      "https://universal-clinic.vercel.app" // production frontend
    ],
    credentials: true
  })
);

// ===============================
// MIDDLEWARE
// ===============================
app.use(express.json());

// ===============================
// ROUTES
// ===============================
const authRoutes = require("./routes/auth.routes");
const doctorRoutes = require("./routes/doctor.routes");
const appointmentRoutes = require("./routes/appointment.routes");

// Health check (VERY IMPORTANT)
app.get("/api/health", (_req, res) => {
  res.status(200).json({ status: "ok" });
});

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/doctors", doctorRoutes);
app.use("/api/appointments", appointmentRoutes);

// Root
app.get("/", (_req, res) => {
  res.json({ message: "Universal Medium Clinic Backend API Running" });
});

// ===============================
// GLOBAL ERROR HANDLER
// ===============================
app.use((err, _req, res, _next) => {
  console.error("❌ Server Error:", err);
  res.status(500).json({ error: "Internal server error" });
});

// ===============================
// SERVER START
// ===============================
const PORT = process.env.PORT || 5001;

const server = app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});

// Handle startup errors
server.on("error", (err) => {
  if (err.code === "EADDRINUSE") {
    console.error(`❌ Port ${PORT} already in use`);
    process.exit(1);
  }
  console.error(err);
  process.exit(1);
});
