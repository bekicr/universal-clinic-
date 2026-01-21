const Appointment = require("../models/appointment.model");

// APPOINTMENTS (Admin + Patient):
// - ADMIN can create appointments for any patient (must provide patient_id).
// - PATIENT can create appointments only for themselves.
exports.createAppointment = async (req, res) => {
  const { doctor_id, appointment_date, status = "pending", patient_id } = req.body;

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
      status,
    });
    res.status(201).json(appointment);
  } catch (err) {
    res.status(500).json({ error: "Failed to create appointment" });
  }
};

// List appointments
// - ADMIN gets all
// - PATIENT gets only theirs
exports.getAppointments = async (req, res) => {
  const isAdmin = req.user.role === "ADMIN";
  try {
    const filter = isAdmin ? {} : { patientId: req.user._id };
    const appointments = await Appointment.find(filter)
      .sort({ appointmentDate: -1 })
      .populate("doctorId", "name specialty")
      .populate("patientId", "name email");
    res.json(appointments);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch appointments" });
  }
};

// Get appointment by id (enforces ownership for patients)
exports.getAppointmentById = async (req, res) => {
  try {
    const appt = await Appointment.findById(req.params.id);

    if (!appt) return res.status(404).json({ error: "Appointment not found" });

    if (req.user.role !== "ADMIN" && appt.patientId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: "Forbidden" });
    }

    res.json(appt);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch appointment" });
  }
};

// Update appointment (enforces ownership for patients)
exports.updateAppointment = async (req, res) => {
  const { doctor_id, appointment_date, status } = req.body;
  const { id } = req.params;

  try {
    const existing = await Appointment.findById(id);

    if (!existing) return res.status(404).json({ error: "Appointment not found" });

    if (req.user.role !== "ADMIN" && existing.patientId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: "Forbidden" });
    }

    if (doctor_id !== undefined) existing.doctorId = doctor_id;
    if (appointment_date !== undefined) existing.appointmentDate = appointment_date;
    if (status !== undefined) existing.status = status;

    await existing.save();

    res.json(existing);
  } catch (err) {
    res.status(500).json({ error: "Failed to update appointment" });
  }
};

// Delete appointment (enforces ownership for patients)
exports.deleteAppointment = async (req, res) => {
  const { id } = req.params;

  try {
    const existing = await Appointment.findById(id);

    if (!existing) return res.status(404).json({ error: "Appointment not found" });

    if (req.user.role !== "ADMIN" && existing.patientId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: "Forbidden" });
    }

    await Appointment.findByIdAndDelete(id);
    res.json({ message: "Appointment deleted" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete appointment" });
  }
};
