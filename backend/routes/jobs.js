const express = require('express');
const Jobs = require('../models/Jobs');
const SavedJobs = require('../models/SavedJobs');
const Recruiter = require('../models/Recruiter');
const fetchuser = require('../middleware/middleware');

const router = express.Router();





router.get('/alljobs', async (req, res) => {
  try {
    const jobs = await Jobs.find();
    res.json(jobs);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

router.get('/recruiterjobs', fetchuser, async (req, res) => {
  try {
    const { id } = req.user;
    const jobs = await Jobs.find({ recruiter: id });
    res.json(jobs);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

router.post('/newjob', fetchuser, async (req, res) => {
  try {
    const { id } = req.user;
    const { title, location, salary, description, requirements } = req.body;

    const recruiter = await Recruiter.findById(id);

    if (!recruiter) {
      return res.status(404).send("Recruiter not found");
    }

    const job = new Jobs({
      title, location, salary, description, requirements, recruiter: id, company: recruiter.organization
    });

    await job.save();

    res.json(job);

  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

router.get('/get-savedjobs', fetchuser, async (req, res) => {
  try {
    const { id } = req.user;
    const savedJobs = await SavedJobs.find({ applicant: id }).populate('job');
    res.json(savedJobs);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

router.post('/savejob/:jobId', fetchuser, async (req, res) => {
  try {
    const { id } = req.user;
    const { jobId } = req.params;

    const job = await Jobs.findById(jobId);

    if (!job) {
      return res.status(404).send("Job not found");
    }

    const savedJob = new SavedJobs({
      applicant: id,
      job: jobId
    });

    await savedJob.save();

    res.json(savedJob);

  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
})

router.delete('/unsavejob/:savedJobId', fetchuser, async (req, res) => {
  try {
    const { id } = req.user;
    if(!id) {
      return res.status(401).send("Unauthorized");
    }
    const { savedJobId } = req.params;
    const savedJob = await SavedJobs.findByIdAndDelete({ _id: savedJobId });

    if (!savedJob) {
      return res.status(404).send("Job not found");
    }

    res.json(savedJob);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

router.get('/:id', fetchuser, async (req, res) => {
  try {
    const { id } = req.params;
    const job = await Jobs.findById(id).populate('recruiter', 'fullname');
    res.json(job);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});




module.exports = router;