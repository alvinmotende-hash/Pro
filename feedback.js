const mongoose = require("mongoose");

// Define the structure of feedback documents
const FeedbackSchema = new mongoose.Schema({
  text: { type: String, required: true },   // the feedback message
  createdAt: { type: Date, default: Date.now } // timestamp
});

// Export the model so server.js can use it
module.exports = mongoose.model("Feedback", FeedbackSchema);
