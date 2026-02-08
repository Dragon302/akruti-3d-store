const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String, required: true },
  read: { type: Boolean, default: false }, // To mark if you have read it
}, { timestamps: true });

module.exports = mongoose.model('Message', MessageSchema);