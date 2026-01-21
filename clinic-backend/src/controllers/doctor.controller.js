const Doctor = require("../models/doctor.model");
const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

// Public: Register a new doctor
exports.registerDoctor = async (req, res) => {
  const { name, email, password, phone, specialty, age, experience, gender, education, bio } = req.body;
  const educationFile = req.file ? req.file.path : null;

  if (!name || !email || !password || !specialty || !age || !experience || !gender || !education) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    // Check if user exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ error: "User already exists with this email" });
    }

    // 1. Create User (Role: DOCTOR)
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      phone,
      role: "DOCTOR",
    });

    // 2. Create Doctor Profile (Status: pending)
    const doctor = await Doctor.create({
      userId: user._id,
      name,
      email,
      phone,
      specialty,
      age,
      experience,
      gender,
      education,
      educationFile,
      bio,
      status: "pending",
    });

    res.status(201).json({
      message: "Doctor registration successful. Waiting for admin approval.",
      doctor,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to register doctor" });
  }
};

// Public: Get all APPROVED doctors
exports.getDoctors = async (_req, res) => {
  try {
    const doctors = await Doctor.find({ status: "approved" }).sort({ name: 1 });
    res.json(doctors);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch doctors" });
  }
};

// Admin: Get PENDING doctors
exports.getPendingDoctors = async (_req, res) => {
  try {
    const doctors = await Doctor.find({ status: "pending" }).sort({ createdAt: -1 });
    res.json(doctors);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch pending doctors" });
  }
};

// Admin: Approve or Reject Doctor
exports.updateDoctorStatus = async (req, res) => {
  const { status } = req.body; // 'approved' or 'rejected'
  const { id } = req.params;

  if (!["approved", "rejected"].includes(status)) {
    return res.status(400).json({ error: "Invalid status" });
  }

  try {
    const doctor = await Doctor.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );
    if (!doctor) return res.status(404).json({ error: "Doctor not found" });
    res.json(doctor);
  } catch (err) {
    res.status(500).json({ error: "Failed to update doctor status" });
  }
};

// Doctor: Get Own Profile
exports.getDoctorProfile = async (req, res) => {
  try {
    const doctor = await Doctor.findOne({ userId: req.user._id });
    if (!doctor) return res.status(404).json({ error: "Doctor profile not found" });
    res.json(doctor);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch profile" });
  }
};

// Public: Get Doctor by ID
exports.getDoctorById = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id);
    if (!doctor) return res.status(404).json({ error: "Doctor not found" });
    res.json(doctor);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch doctor" });
  }
};

// Admin: Delete Doctor
exports.deleteDoctor = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id);
    if (!doctor) return res.status(404).json({ error: "Doctor not found" });

    // Also delete the associated User account
    await User.findByIdAndDelete(doctor.userId);
    await doctor.deleteOne();

    res.json({ message: "Doctor deleted" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete doctor" });
  }
};
