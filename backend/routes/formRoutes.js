const express = require("express");
const router = express.Router();
const FormData = require("../models/FormDataModel"); // Import the FormData model

// POST route to handle form submission
router.post("/api/submit", async (req, res) => {
  try {
    // Create a new form entry based on the submitted data
    const formEntry = new FormData(req.body);

    // Save the form data to MongoDB
    await formEntry.save();

    res.json({ received: true, data: req.body });
  } catch (err) {
    console.error("Error saving form data:", err);
    res.status(500).json({ error: "Failed to save form data" });
  }
});

// GET route for testing the backend
router.get("/api/test-route", (req, res) => {
  res.json({ status: "Backend is working!" });
});

module.exports = router;
