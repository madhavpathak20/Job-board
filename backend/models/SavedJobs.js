const mongoose = require('mongoose');

const SavedJobSchema = new mongoose.Schema({
  applicant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  job: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Jobs'
  },
  date: {
    type: Date,
    default: Date.now
  },
});

module.exports = mongoose.model('SavedJobs', SavedJobSchema);