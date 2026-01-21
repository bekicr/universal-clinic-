const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const {
  getDoctors,
  getDoctorById,
  registerDoctor,
  getPendingDoctors,
  updateDoctorStatus,
  getDoctorProfile,
  deleteDoctor,
} = require("../controllers/doctor.controller");
const { authenticate, requireRole } = require("../middlewares/auth.middleware");

// Configure Multer for file upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

// Public Routes
router.get("/", getDoctors); // Only approved
router.post("/register", upload.single("educationFile"), registerDoctor);
router.get("/:id", getDoctorById);

// Protected Routes
router.use(authenticate);

// Doctor Routes
router.get("/profile/me", requireRole("DOCTOR"), getDoctorProfile);

// Admin Routes
router.get("/admin/pending", requireRole("ADMIN"), getPendingDoctors);
router.put("/admin/:id/status", requireRole("ADMIN"), updateDoctorStatus);
router.delete("/:id", requireRole("ADMIN"), deleteDoctor);

module.exports = router;
