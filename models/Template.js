const mongoose = require('mongoose');

const templateSchema = new mongoose.Schema({
  name: { type: String, required: true },
  content: { type: String, required: true }, // HTML/CSS or text structure
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Template', templateSchema);