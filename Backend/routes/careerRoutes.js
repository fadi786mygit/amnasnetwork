// routes/careerRoutes.js
const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/authMiddleware');
const {
  createCareer,
  getCareers,
  getCareerById,
  updateCareer,
  deleteCareer,
  getCareerStats
} = require('../controller/careerController');

// Public routes
router.get('/getCareers', getCareers);
router.get('/getCareer/:id', getCareerById);

// Admin protected routes
router.post(
  '/createCareer',
  protect,
  authorize('admin'),
  createCareer
);

router.put(
  '/updateCareer/:id',
  protect,
  authorize('admin'),
  updateCareer
);

router.delete(
  '/deleteCareer/:id',
  protect,
  authorize('admin'),
  deleteCareer
);

router.get(
  '/stats',
  protect,
  authorize('admin'),
  getCareerStats
);

module.exports = router;