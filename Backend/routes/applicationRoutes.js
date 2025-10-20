// routes/applicationRoutes.js
const express = require('express');
const router = express.Router();
const {
    submitApplication,
    getUserApplications,
    getAllApplications
} = require('../controller/applicationController');
const {protect} = require('../middleware/authMiddleware');

router.post('/apply', protect, submitApplication);
router.get('/my-applications', protect, getUserApplications);
router.get('/admin/applications', protect, getAllApplications);

module.exports = router;