const express = require('express');
const Applicant = require('../models/Applicant');
const Recruiter = require('../models/Recruiter');
const jwt = require('jsonwebtoken');
const router = express.Router();
const bcrypt = require('bcryptjs');
const fetchuser = require('../middleware/middleware');

// For Applicant
router.post('/login-applicant', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Please enter all fields" });
    }

    const user = await Applicant.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User does not exist" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    res.json({
      token,
      user: {
        id: user._id,
        email: user.email,
        type: user.type,
      },
    });


  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
})

router.post('/register-applicant', async (req, res) => {
  try {
    const { fullname, email, password, skills, bio } = req.body;
    const newUser = new Applicant({ fullname, email, password, skills, bio, type: "applicant" });

    if (!fullname || !email || !password || !skills || !bio) {
      return res.status(400).json({ message: "Please enter all fields" });
    }

    const existingUser = await Applicant.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    await newUser.save();

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);

    res.json({
      token,
      user: {
        id: newUser._id,
        email: newUser.email,
        type: newUser.type,
      },
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
})


// For Recruiter
router.post('/login-recruiter', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Please enter all fields" });
    }

    const user = await Recruiter.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User does not exist" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    res.json({
      token,
      user: {
        id: user._id,
        email: user.email,
        type: user.type,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.post('/register-recruiter', async (req, res) => {
  try {
    const { fullname, email, password, organization } = req.body;
    const newUser = new Recruiter({ fullname, email, password, organization, type: "recruiter" });

    if (!fullname || !email || !password || !organization) {
      return res.status(400).json({ message: "Please enter all fields" });
    }

    const existingUser = await Recruiter.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    await newUser.save();

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);

    res.json({
      token,
      user: {
        id: newUser._id,
        email: newUser.email,
        type: newUser.type,
      },
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
})

// User
router.get('/getprofile', fetchuser,async (req, res) => {
  try {
    const { id } = req.user;
    const user = await Applicant.findById(id);

    if (!user) {
      const user = await Recruiter.findById(id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
    }

    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
})



module.exports = router;