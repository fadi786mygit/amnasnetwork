// controller/applicationController.js
const Application = require('../models/Applications');
const Career = require('../models/Career');

const submitApplication = async (req, res) => {
  try {
    const {
      careerId,
      careerTitle,
      fullName,
      email,
      phone,
      coverLetter,
      portfolio,
      linkedin,
      expectedSalary,
      noticePeriod,
      source
    } = req.body;


    // Check if user already applied for this job
    const existingApplication = await Application.findOne({
      careerId,
      email
    });

    if (existingApplication) {
      return res.status(400).json({
        success: false,
        message: 'You have already applied for this position'
      });
    }

    const application = await Application.create({
      careerId,
      careerTitle,
      applicantId: req.user.id,
      fullName,
      email,
      phone,
      coverLetter,
      portfolio,
      linkedin,
      expectedSalary,
      noticePeriod,
      source,
      status: 'pending'
    });

    res.status(201).json({
      success: true,
      message: 'Application submitted successfully',
      application
    });

  } catch (error) {
    console.error('Application submission error:', error);
    res.status(500).json({
      success: false,
      message: 'Error submitting application'
    });
  }
};

const getUserApplications = async (req, res) => {
  try {
    const applications = await Application.find({ applicantId: req.user.id })
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      applications
    });
  } catch (error) {
    console.error('Get applications error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching applications'
    });
  }
};

const getAllApplications = async (req, res) => {
  try {
    // Check if user is admin
    if (req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Access denied'
      });
    }

    const applications = await Application.find()
      .sort({ createdAt: -1 })
      .populate('careerId', 'title company');

    res.json({
      success: true,
      applications
    });
  } catch (error) {
    console.error('Get all applications error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching applications'
    });
  }
};

module.exports = {
  submitApplication,
  getUserApplications,
  getAllApplications
};