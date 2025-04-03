const express = require("express");
const router = express.Router();
const formSchema = require("../models/FormDataModel"); // Import the model

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

// Modified POST endpoint to actually save data
router.post("/api/submit", async (req, res) => {
  try {
    const newDoc = await formSchema.create({ data: req.body });
    res.json({ 
      received: true, 
      savedData: newDoc,
      message: "Document saved successfully" 
    });
  } catch (error) {
    res.status(500).json({ 
      error: "Failed to save document",
      details: error.message 
    });
  }
});

// New GET endpoint to fetch all documents
router.get("/api/documents", async (req, res) => {
  try {
    const docs = await formSchema.find().sort({ createdAt: -1 });
    res.json(docs);
  } catch (error) {
    res.status(500).json({ 
      error: "Failed to fetch documents",
      details: error.message 
    });
  }
});

// Your existing test route
router.get("/api/test-route", (req, res) => {
  res.json({ status: "Backend is working!" });
});

module.exports = router;