const express = require("express");
const router = express.Router();
const formSchema = require("../models/FormDataModel"); // Import the model

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

// ✅ Corrected POST endpoint
router.post("/api/submit", async (req, res) => {
  try {
    console.log("Received Data:", req.body); // Log received data for debugging
    
    const newDoc = await formSchema.create(req.body); // ✅ Corrected

    res.json({ 
      received: true, 
      savedData: newDoc, // ✅ Full saved document
      message: "Document saved successfully" 
    });

  } catch (error) {
    console.error("❌ Error saving document:", error);
    res.status(500).json({ 
      error: "Failed to save document",
      details: error.message 
    });
  }
});

// ✅ Fetch all documents
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

// ✅ Test route
router.get("/api/test-route", (req, res) => {
  res.json({ status: "Backend is working!" });
});

module.exports = router;
