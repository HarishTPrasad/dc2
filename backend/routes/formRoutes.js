const express = require("express");
const router = express.Router();

router.post("/api/submit", (req, res) => {
  res.json({ received: true, data: req.body });
});

router.get("/api/test-route", (req, res) => {
  res.json({ status: "Backend is working!" });
});

module.exports = router; // ✅ Make sure to export the router!
