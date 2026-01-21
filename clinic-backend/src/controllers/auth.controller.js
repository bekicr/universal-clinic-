const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const generateToken = (id) => {
	return jwt.sign({ id }, process.env.JWT_SECRET || "dev-secret", {
		expiresIn: "30d",
	});
};

// Public: Register a new user (patient)
exports.register = async (req, res) => {
	const { name, email, password, phone } = req.body;

	if (!name || !email || !password) {
		return res.status(400).json({ error: "Name, email and password are required" });
	}

	try {
		const exists = await User.findOne({ email });
		if (exists) return res.status(400).json({ error: "User already exists" });

		const salt = await bcrypt.genSalt(10);
		const hashed = await bcrypt.hash(password, salt);

		const user = await User.create({ name, email, password: hashed, phone, role: "PATIENT" });

		res.status(201).json({
			user: { id: user._id, name: user.name, email: user.email, role: user.role },
			token: generateToken(user._id),
		});
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: "Failed to register user" });
	}
};

// Public: Login
exports.login = async (req, res) => {
	const { email, password } = req.body;

	if (!email || !password) return res.status(400).json({ error: "Email and password required" });

	try {
		const user = await User.findOne({ email });
		if (!user) return res.status(400).json({ error: "Invalid credentials" });

		const match = await bcrypt.compare(password, user.password);
		if (!match) return res.status(400).json({ error: "Invalid credentials" });

		res.json({ user: { id: user._id, name: user.name, email: user.email, role: user.role }, token: generateToken(user._id) });
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: "Failed to login" });
	}
};

// Authenticated: Get current user (req.user is set by middleware)
exports.getMe = async (req, res) => {
	if (!req.user) return res.status(401).json({ error: "Unauthorized" });
	res.json(req.user);
};

// Authenticated: Update profile
exports.updateProfile = async (req, res) => {
	try {
		const updates = {};
		const { name, phone, password } = req.body;
		if (name) updates.name = name;
		if (phone) updates.phone = phone;
		if (password) {
			const salt = await bcrypt.genSalt(10);
			updates.password = await bcrypt.hash(password, salt);
		}

		const user = await User.findByIdAndUpdate(req.user._id, updates, { new: true }).select("-password");
		res.json(user);
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: "Failed to update profile" });
	}
};

