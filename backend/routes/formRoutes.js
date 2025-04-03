const express = require('express');
const router = express.Router();
const Form = require('../models/FormDataModel');
const { generateToken, verifyToken } = require('../config/jwt');
const auth = require('../middlewares/auth');

// Test route (public)
router.get('/api/test-route', (req, res) => {
  res.json({ status: "Backend is working!" });
});

// Form submission (protected)
router.post('/api/submit', auth, async (req, res) => {
  try {
    const formData = new Form({
      name: req.body.name,
      email: req.body.email,
      data: req.body.data
    });

    const savedForm = await formData.save();
    res.json({ 
      success: true,
      data: savedForm,
      token: generateToken(savedForm._id) 
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all submissions (protected)
router.get('/api/submissions', auth, async (req, res) => {
  try {
    const forms = await Form.find();
    res.json(forms);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;