const mongoose = require("mongoose");

// Define the structure of admin documents
const AdminSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true }, // admin username
  password: { type: String, required: true }                // hashed password
});

// Export the model so server.js can use it
module.exports = mongoose.model("Admin", AdminSchema);
