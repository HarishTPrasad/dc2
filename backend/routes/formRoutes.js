const express = require('express');
const router = express.Router();
const Form = require('../models/FormDataModel');
const { generateToken } = require('../config/jwt');

// Middleware to conditionally disable auth
const optionalAuth = (req, res, next) => {
  if (process.env.DISABLE_AUTH === 'true') {
    return next(); // Skip authentication
  }
  require('../middlewares/auth')(req, res, next); // Use normal auth
};

// Test route (always public)
router.get('/api/test-route', (req, res) => {
  res.json({ 
    status: "Backend is working!",
    authDisabled: process.env.DISABLE_AUTH === 'true'
  });
});

// Form submission (conditionally protected)
router.post('/api/submit', optionalAuth, async (req, res) => {
  try {
    // Input validation
    if (!req.body.name || !req.body.email) {
      return res.status(400).json({ error: "Name and email are required" });
    }

    const formData = new Form({
      ...req.body,
      ipAddress: req.ip // Track submission source
    });

    const savedForm = await formData.save();
    
    res.json({ 
      success: true,
      data: savedForm,
      // Only generate token if auth is enabled
      token: process.env.DISABLE_AUTH ? null : generateToken(savedForm._id) 
    });

  } catch (err) {
    // Handle duplicate emails or DB errors
    if (err.code === 11000) {
      return res.status(400).json({ error: "Email already exists" });
    }
    res.status(500).json({ error: "Server error" });
  }
});

// Get all submissions (conditionally protected)
router.get('/api/submissions', optionalAuth, async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const forms = await Form.find()
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const count = await Form.countDocuments();

    res.json({
      total: count,
      pages: Math.ceil(count / limit),
      currentPage: page,
      data: forms
    });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;