const express = require('express');
const app = express();

// Add these middlewares FIRST
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Test route (add this before your form routes)
app.get('/api/test-route', (req, res) => {
  res.json({ status: 'Backend is working!' });
});

// Your existing form submission route
app.post('/api/submit', (req, res) => {
  res.json({ received: true, data: req.body });
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://10.0.1.221:${PORT}`);
});