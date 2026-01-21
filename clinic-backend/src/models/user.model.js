const mongoose = require("../db");

// User schema for patients and admins
// - role: 'PATIENT' | 'ADMIN'
// - password will be stored as a bcrypt hash
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    phone: {
      type: String,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["PATIENT", "ADMIN", "DOCTOR"],
      default: "PATIENT",
    },
  },
  {
    timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" },
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;

