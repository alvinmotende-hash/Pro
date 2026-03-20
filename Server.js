const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Feedback = require("./models/Feedback");
const Admin = require("./models/Admin");

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/creativepro", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const SECRET = "supersecretkey"; // change this to something stronger

// --- USER ROUTES ---
app.get("/api/feedback", async (req, res) => {
  const feedbacks = await Feedback.find().sort({ createdAt: -1 });
  res.json(feedbacks);
});

app.post("/api/feedback", async (req, res) => {
  const fb = new Feedback({ text: req.body.text });
  await fb.save();
  res.json(fb);
});

// --- AUTH MIDDLEWARE ---
function authMiddleware(req, res, next) {
  const token = req.headers["authorization"];
  if (!token) return res.status(401).json({ message: "No token provided" });
  try {
    const decoded = jwt.verify(token, SECRET);
    req.adminId = decoded.id;
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
}

// --- ADMIN ROUTES ---
app.post("/api/admin/register", async (req, res) => {
  const { username, password } = req.body;
  const hashed = await bcrypt.hash(password, 10);
  const admin = new Admin({ username, password: hashed });
  await admin.save();
  res.json({ message: "Admin registered" });
});

app.post("/api/admin/login", async (req, res) => {
  const { username, password } = req.body;
  const admin = await Admin.findOne({ username });
  if (!admin) return res.status(401).json({ message: "Invalid credentials" });
  const valid = await bcrypt.compare(password, admin.password);
  if (!valid) return res.status(401).json({ message: "Invalid credentials" });
  const token = jwt.sign({ id: admin._id }, SECRET, { expiresIn: "1h" });
  res.json({ token });
});

app.delete("/api/feedback/:id", authMiddleware, async (req, res) => {
  await Feedback.findByIdAndDelete(req.params.id);
  res.json({ message: "Feedback deleted" });
});

// Start server
app.listen(5000, () => console.log("✅ Server running on http://localhost:5000"));
