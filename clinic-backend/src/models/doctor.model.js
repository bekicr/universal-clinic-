const mongoose = require("../db");

// Doctor schema
const doctorSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    specialty: {
      type: String,
      required: true,
      trim: true,
    },
    age: {
      type: Number,
      required: true,
    },
    experience: {
      type: Number,
      required: true,
    },
    gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
    },
    educationFile: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
    availability: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

const Doctor = mongoose.model("Doctor", doctorSchema);

module.exports = Doctor;
