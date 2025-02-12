const mongoose = require('mongoose');

const ApplicationSchema = new mongoose.Schema({
    applicant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    job: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Jobs'
    },
    sop: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: 'Applied'
    },
    date: {
        type: Date,
        default: Date.now
    },
    resume: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Application', ApplicationSchema);