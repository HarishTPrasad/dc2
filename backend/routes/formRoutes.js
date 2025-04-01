const express = require('express');
const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get('/api/test-route', (req, res) => {
  res.json({ status: 'Backend is working!' });
});


app.post('/api/submit', (req, res) => {
  res.json({ received: true, data: req.body });
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://10.0.1.221:${PORT}`);
});