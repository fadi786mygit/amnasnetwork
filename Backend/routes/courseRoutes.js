const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/authMiddleware');
const { createCourse, getCourses, getCourseById, updateCourse, deleteCourse } = require('../controller/CourseController');



router.post(
  '/createCourse',
  protect,
  authorize('admin'),
  createCourse
);


router.get('/getCourses', getCourses);

router.get('/getCourse/:id', getCourseById);
router.put(
  '/updateCourse/:id',
  protect,
  authorize('admin'),
  updateCourse
);

router.delete(
  '/deleteCourse/:id',
  protect,
  authorize('admin'),
  deleteCourse
);


module.exports = router;