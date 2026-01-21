const express = require("express");
const router = express.Router();
const appointmentController = require("../controllers/appointment.controller");
const { authenticate } = require("../middlewares/auth.middleware");

// Admin + Patient (restrictions enforced in controller)
router.use(authenticate);

router.get("/", appointmentController.getAppointments);
router.get("/:id", appointmentController.getAppointmentById);
router.post("/", appointmentController.createAppointment);
router.put("/:id", appointmentController.updateAppointment);
router.delete("/:id", appointmentController.deleteAppointment);

module.exports = router;
