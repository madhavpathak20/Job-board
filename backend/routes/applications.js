const express = require('express');
const multer = require('multer');
const path = require('path');
const fetchuser = require('../middleware/middleware');
const Application = require('../models/Application');
const fs = require('fs');

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = 'uploads/resumes';
    // Create directory if it doesn't exist
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    // Create unique filename with timestamp
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

// File filter to accept only specific file types
const fileFilter = (req, file, cb) => {
  const allowedFileTypes = ['.pdf', '.doc', '.docx'];
  const ext = path.extname(file.originalname).toLowerCase();
  if (allowedFileTypes.includes(ext)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only PDF, DOC, and DOCX files are allowed.'));
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB limit
  }
});

router.post('/apply/:jobId', upload.single('resume'), fetchuser, async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'Resume file is required' });
    }

    const newApplication = new Application({
      applicant: req.user.id,
      job: req.params.jobId,
      resume: req.file.path,
      sop: req.body.sop
    });

    await newApplication.save();
    res.status(201).json({
      message: 'Application submitted successfully',
      application: newApplication
    });

  } catch (error) {
    if (req.file) {
      fs.unlinkSync(req.file.path);
    }
    res.status(500).json({ error: 'Error submitting application' });
  }
});

router.get('/my-applications', fetchuser, async (req, res) => {
  try {
    const applications = await Application.find({ applicant: req.user.id }).populate('job');
    res.json(applications);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching applications' });
  }
});

router.get('/applications', fetchuser, async (req, res) => {
  try {
    const applications = await Application.find({}).populate([
      { path: 'job' },
      { path: 'applicant' }
    ]);;
    const myApplications = applications.filter(application => application.job.recruiter.toString() === req.user.id);
    res.json(myApplications);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching applications' });
  }
});

router.put('/update-status/:applicationId', fetchuser, async (req, res) => {
  try {
    console.log(req.params.applicationId, req.body);
    const application = await Application.findById(req.params.applicationId);
    if (!application) {
      return res.status(404).json({ error: 'Application not found' });
    }

    application.status = req.body.status;
    await application.save();
    res.json(application);
  } catch (error) {
    res.status(500).json({ error: 'Error updating application status' });
  }
});


module.exports = router;