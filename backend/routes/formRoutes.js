const express = require("express");
const router = express.Router();
const FormDataModel = require("../models/FormDataModel");

// POST route to handle form submission
router.post("/api/submit", async (req, res) => {
    try {
        const formData = new FormDataModel(req.body);
        await formData.save();
        res.status(201).json({ message: "Form data saved successfully!" });
    } catch (error) {
        console.error("Error saving form data:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

module.exports = router;
