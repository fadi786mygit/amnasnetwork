// controllers/careerController.js
const Career = require('../models/Career');
const mongoose = require('mongoose');

// @desc    Create a new job posting
// @route   POST /api/careers/createCareer
// @access  Admin
const createCareer = async (req, res) => {
  try {
    const {
      title,
      company,
      location,
      employmentType,
      category,
      salary,
      description,
      requirements,
      responsibilities,
      benefits,
      applicationLink,
      applicationEmail,
      deadline,
      experienceLevel,
      tags
    } = req.body;

    // Check required fields
    if (!title || !company || !location || !description) {
      return res.status(400).json({
        success: false,
        message: 'Title, company, location, and description are required',
      });
    }

    // Create new career/job posting
    const newCareer = await Career.create({
      title,
      company,
      location,
      employmentType,
      category,
      salary,
      description,
      requirements: requirements || [],
      responsibilities: responsibilities || [],
      benefits: benefits || [],
      applicationLink,
      applicationEmail,
      deadline,
      experienceLevel,
      tags: tags || []
    });

    res.status(201).json({
      success: true,
      message: 'Job posting created successfully',
      data: newCareer,
    });
  } catch (error) {
    console.error('Error creating job posting:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server Error',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// @desc    Get all job postings (with optional filters)
// @route   GET /api/careers/getCareers
// @access  Public
const getCareers = async (req, res) => {
  try {
    const {
      category,
      employmentType,
      experienceLevel,
      location,
      search,
      isActive = true
    } = req.query;

    // Build filter object
    let filter = { isActive };

    if (category && category !== 'all') {
      filter.category = category;
    }

    if (employmentType && employmentType !== 'all') {
      filter.employmentType = employmentType;
    }

    if (experienceLevel && experienceLevel !== 'all') {
      filter.experienceLevel = experienceLevel;
    }

    if (location) {
      filter.location = { $regex: location, $options: 'i' };
    }

    // Text search
    if (search) {
      filter.$text = { $search: search };
    }

    // Filter out expired deadlines
    filter.$or = [
      { deadline: { $exists: false } },
      { deadline: null },
      { deadline: { $gte: new Date() } }
    ];

    const careers = await Career.find(filter)
      .sort({ createdAt: -1 }) // latest first
      .select('-__v');

    res.status(200).json({
      success: true,
      count: careers.length,
      data: careers,
    });
  } catch (error) {
    console.error('Error fetching job postings:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server Error',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// @desc    Get a single job posting by ID
// @route   GET /api/careers/getCareer/:id
// @access  Public
const getCareerById = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if ID is provided
    if (!id || id === 'undefined') {
      return res.status(400).json({
        success: false,
        message: 'Job ID is required',
      });
    }

    // Validate if it's a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid job ID format',
      });
    }

    const career = await Career.findById(id);

    if (!career) {
      return res.status(404).json({
        success: false,
        message: 'Job posting not found',
      });
    }

    // Check if job is active and not expired
    if (!career.isActive || (career.deadline && new Date(career.deadline) < new Date())) {
      return res.status(404).json({
        success: false,
        message: 'This job posting is no longer available',
      });
    }

    res.status(200).json({
      success: true,
      data: career,
    });
  } catch (error) {
    console.error('Error fetching job posting:', error);
    
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid job ID',
      });
    }
    
    res.status(500).json({ 
      success: false, 
      message: 'Server Error',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// @desc    Update a job posting
// @route   PUT /api/careers/updateCareer/:id
// @access  Admin
const updateCareer = async (req, res) => {
  try {
    const career = await Career.findById(req.params.id);

    if (!career) {
      return res.status(404).json({
        success: false,
        message: 'Job posting not found',
      });
    }

    const updatedCareer = await Career.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(200).json({
      success: true,
      message: 'Job posting updated successfully',
      data: updatedCareer,
    });
  } catch (error) {
    console.error('Error updating job posting:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server Error',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// @desc    Delete a job posting
// @route   DELETE /api/careers/deleteCareer/:id
// @access  Admin
const deleteCareer = async (req, res) => {
  try {
    const career = await Career.findById(req.params.id);

    if (!career) {
      return res.status(404).json({
        success: false,
        message: 'Job posting not found',
      });
    }

    await career.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Job posting deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting job posting:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server Error',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// @desc    Get career statistics
// @route   GET /api/careers/stats
// @access  Admin
const getCareerStats = async (req, res) => {
  try {
    const totalJobs = await Career.countDocuments();
    const activeJobs = await Career.countDocuments({ 
      isActive: true,
      $or: [
        { deadline: { $exists: false } },
        { deadline: null },
        { deadline: { $gte: new Date() } }
      ]
    });
    
    const jobsByCategory = await Career.aggregate([
      { $group: { _id: '$category', count: { $sum: 1 } } }
    ]);
    
    const jobsByType = await Career.aggregate([
      { $group: { _id: '$employmentType', count: { $sum: 1 } } }
    ]);

    res.status(200).json({
      success: true,
      data: {
        totalJobs,
        activeJobs,
        jobsByCategory,
        jobsByType
      }
    });
  } catch (error) {
    console.error('Error fetching career stats:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server Error' 
    });
  }
};

module.exports = {
  createCareer,
  getCareers,
  getCareerById,
  updateCareer,
  deleteCareer,
  getCareerStats
};