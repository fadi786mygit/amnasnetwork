// routes/admin.js
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');


// Admin Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    // Check if admin exists
    const adminUser = await User.findOne({ email });
    if (!adminUser || adminUser.role !== 'admin') {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Check password (in production, use bcrypt.compare)
    const isValidPassword = await bcrypt.compare(password, adminUser.password);
    
    if (!isValidPassword) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate token
   const token = jwt.sign(
  { 
    id: adminUser._id,   // 👈 match the protect middleware
    role: adminUser.role
  },
  process.env.JWT_SECRET || 'your-secret-key',
  { expiresIn: '24h' }
);


    res.json({
      token,
      admin: {
        email: adminUser.email,
        name: adminUser.name,
        role: adminUser.role
      }
    });

  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all users (protected route)
router.get('/users', authenticateToken, async (req, res) => {
  try {
    
    const users = await User.find().select('-password');
    res.json({ users });
    
   
    
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Middleware to authenticate token
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Access token required' });
  }

  jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key', (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid token' });
    }
    
    if (user.role !== 'admin') {
      return res.status(403).json({ message: 'Admin access required' });
    }
    
    req.user = user;
    next();
  });
}

module.exports = router;