const express = require('express');
const router = express.Router();
const {
  registerUser,
  loginUser,
  checkEmailExists,
  getUserProfile,
  updateUserProfile,
  getUserById,
  getUsers,
  deleteUser
} = require('../controller/userController');
const {protect} = require('../middleware/authMiddleware'); // Add this import

// Public routes
router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/check-email', checkEmailExists);
router.get('/getUsers', getUsers); // New route to get all users

// Protected routes - Add auth middleware
router.put('/profile', protect, updateUserProfile); // Add auth here
router.get('/profile', protect, getUserProfile); // Add auth here
router.get('/:id', protect, getUserById); // Add auth here
router.delete('/:id', protect, deleteUser); // Add auth here

module.exports = router;