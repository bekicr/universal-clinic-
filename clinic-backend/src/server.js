require("dotenv").config();
const express = require("express");
const cors = require("cors");

// Initialize DB connection (MongoDB via Mongoose)
require("./db");

// Fail fast if critical env vars are missing
if (!process.env.JWT_SECRET) {
  console.error('JWT_SECRET is required. Add JWT_SECRET=<your-secret> to .env');
  process.exit(1);
}

const authRoutes = require("./routes/auth.routes");
const doctorRoutes = require("./routes/doctor.routes");
const appointmentRoutes = require("./routes/appointment.routes");

const path = require("path");

const app = express();

// Basic middleware
app.use(cors());
app.use(express.json());

// Serve uploaded files statically
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/doctors", doctorRoutes);
app.use("/api/appointments", appointmentRoutes);

app.get("/", (_req, res) => {
  res.json({ message: "Clinic Backend API Running" });
});

// Generic error handler to avoid leaking stack traces
// eslint-disable-next-line no-unused-vars
app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ error: "Internal server error" });
});

const PORT = process.env.PORT || 5001;

const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Handle common startup errors (e.g. port already in use)
server.on("error", (err) => {
  if (err && err.code === "EADDRINUSE") {
    console.error(
      `Port ${PORT} is already in use. Set PORT in .env (e.g. PORT=5001) or stop the process using that port.`
    );
    process.exit(1);
  }
  console.error(err);
  process.exit(1);
});
