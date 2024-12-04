const mongoose = require('mongoose');

const ProgressSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  hardSkills: {
    currentLevel: { type: Number, default: 0 },
    totalProgress: { type: Number, default: 0 },
    completedModules: [{ type: String }]
  },
  softSkills: {
    currentLevel: { type: Number, default: 0 },
    totalProgress: { type: Number, default: 0 },
    completedModules: [{ type: String }]
  }
}, { timestamps: true });

module.exports = mongoose.model('Progress', ProgressSchema);