const Appointment = require("../models/appointment.model");
const Doctor = require("../models/doctor.model");

// APPOINTMENTS (Admin + Patient):
// - ADMIN can create appointments for any patient (must provide patient_id).
// - PATIENT can create appointments only for themselves.
exports.createAppointment = async (req, res) => {
  const { doctor_id, appointment_date, status = "pending", patient_id, reason } = req.body;

  if (!doctor_id || !appointment_date) {
    return res.status(400).json({ error: "doctor_id and appointment_date are required" });
  }

  const isAdmin = req.user.role === "ADMIN";
  const resolvedPatientId = isAdmin ? patient_id : req.user._id;

  if (!resolvedPatientId) {
    return res.status(400).json({ error: "patient_id is required" });
  }

  try {
    const appointment = await Appointment.create({
      patientId: resolvedPatientId,
      doctorId: doctor_id,
      appointmentDate: appointment_date,
      reason,
      status,
    });
    res.status(201).json(appointment);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create appointment" });
  }
};

// List appointments
// - ADMIN gets all
// - PATIENT gets only theirs
// - DOCTOR gets only theirs
exports.getAppointments = async (req, res) => {
  try {
    let filter = {};

    if (req.user.role === "PATIENT") {
      filter = { patientId: req.user._id };
    } else if (req.user.role === "DOCTOR") {
      const doctor = await Doctor.findOne({ userId: req.user._id });
      if (!doctor) {
        // If doctor profile not found (e.g. pending/deleted), return empty or error
        // Returning empty list is safer to avoid UI crash
        return res.json([]); 
      }
      filter = { doctorId: doctor._id };
    }
    // ADMIN sees all

    const appointments = await Appointment.find(filter)
      .sort({ appointmentDate: -1 })
      .populate("doctorId", "name specialty")
      .populate("patientId", "name email phone"); // Added phone for doctor to see
    res.json(appointments);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch appointments" });
  }
};

// Get appointment by id (enforces ownership)
exports.getAppointmentById = async (req, res) => {
  try {
    const appt = await Appointment.findById(req.params.id)
      .populate("doctorId", "name specialty")
      .populate("patientId", "name email phone");

    if (!appt) return res.status(404).json({ error: "Appointment not found" });

    // Access Control
    if (req.user.role === "PATIENT" && appt.patientId._id.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: "Forbidden" });
    }
    
    if (req.user.role === "DOCTOR") {
      const doctor = await Doctor.findOne({ userId: req.user._id });
      if (!doctor || appt.doctorId._id.toString() !== doctor._id.toString()) {
        return res.status(403).json({ error: "Forbidden" });
      }
    }

    res.json(appt);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch appointment" });
  }
};

// Update appointment (enforces ownership)
exports.updateAppointment = async (req, res) => {
  const { doctor_id, appointment_date, status, reason } = req.body;
  const { id } = req.params;

  try {
    const existing = await Appointment.findById(id);

    if (!existing) return res.status(404).json({ error: "Appointment not found" });

    // Access Control
    if (req.user.role === "PATIENT") {
       if (existing.patientId.toString() !== req.user._id.toString()) {
          return res.status(403).json({ error: "Forbidden" });
       }
       // Patients can only cancel or update reason/date if pending
       if (status && status !== "cancelled") {
          return res.status(403).json({ error: "Patients can only cancel appointments" });
       }
    }

    if (req.user.role === "DOCTOR") {
      const doctor = await Doctor.findOne({ userId: req.user._id });
      if (!doctor || existing.doctorId.toString() !== doctor._id.toString()) {
        return res.status(403).json({ error: "Forbidden" });
      }
      // Doctors typically update status (approve/reject)
    }

    if (doctor_id !== undefined) existing.doctorId = doctor_id;
    if (appointment_date !== undefined) existing.appointmentDate = appointment_date;
    if (status !== undefined) existing.status = status;
    if (reason !== undefined) existing.reason = reason;

    await existing.save();

    res.json(existing);
  } catch (err) {
    res.status(500).json({ error: "Failed to update appointment" });
  }
};

// Delete appointment (enforces ownership)
exports.deleteAppointment = async (req, res) => {
  const { id } = req.params;

  try {
    const existing = await Appointment.findById(id);

    if (!existing) return res.status(404).json({ error: "Appointment not found" });
    
    // Only Admin can delete? Or patient?
    // Let's say only Admin or Patient (cancel)
    if (req.user.role !== "ADMIN" && existing.patientId.toString() !== req.user._id.toString()) {
        return res.status(403).json({ error: "Forbidden" });
    }

    await existing.deleteOne();
    res.json({ message: "Appointment deleted" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete appointment" });
  }
};
