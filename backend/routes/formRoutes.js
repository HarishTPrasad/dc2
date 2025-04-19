const express = require("express");
const router = express.Router();

// Models
const User = require("../models/User");
const formSchema = require("../models/FormDataModel");
const ClientData = require("../models/ClientData");
const ProjectData = require("../models/ProjectData");
const TechData = require("../models/TechData");



// Middleware
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

// ----------------------- USER ROUTES -----------------------

// CREATE User
router.post("/api/users", async (req, res) => {
  try {
    const { username, password } = req.body;
    const newUser = await User.create({ username, password, role, fullname, userid });
    res.status(201).json({
      success: true,
      data: newUser,
      message: "User created successfully"
    });
  } catch (error) {
    console.error("❌ Error creating user:", error);
    res.status(500).json({
      success: false,
      error: "Failed to create user",
      details: error.message
    });
  }
});

// READ All Users
router.get("/api/users", async (req, res) => {
  try {
    const users = await User.find();
    res.json({ success: true, data: users });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Failed to fetch users",
      details: error.message
    });
  }
});

// READ One User by ID
router.get("/api/users/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ success: false, error: "User not found" });
    res.json({ success: true, data: user });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Failed to fetch user",
      details: error.message
    });
  }
});

// UPDATE User
router.put("/api/users/:id", async (req, res) => {
  try {
    const { username, password, role, fullname, userid } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { username, password, role, fullname, userid },
      { new: true, runValidators: true }
    );
    if (!updatedUser) return res.status(404).json({ success: false, error: "User not found" });
    res.json({
      success: true,
      data: updatedUser,
      message: "User updated successfully"
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Failed to update user",
      details: error.message
    });
  }
});

// DELETE User
router.delete("/api/users/:id", async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) return res.status(404).json({ success: false, error: "User not found" });
    res.json({ success: true, message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Failed to delete user",
      details: error.message
    });
  }
});

// ------------------- FORM / DOCUMENT ROUTES -------------------

// Submit New Form
router.post("/api/submit", async (req, res) => {
  try {
    console.log("Received Data:", req.body);
    const newDoc = await formSchema.create(req.body);
    res.status(201).json({
      success: true,
      data: newDoc,
      message: "Document saved successfully"
    });
  } catch (error) {
    console.error("❌ Error saving document:", error);
    res.status(500).json({
      success: false,
      error: "Failed to save document",
      details: error.message
    });
  }
});

// Get All Documents with Filtering
router.get("/api/documents", async (req, res) => {
  try {
    const {
      status,
      assignedTo,
      sortBy = 'createdAt',
      sortOrder = 'desc',
      page = 1,
      limit = 10
    } = req.query;

    const filter = {};
    if (status) filter.implementationStatus = status;
    if (assignedTo) filter.implementationAssigned = assignedTo;

    const skip = (page - 1) * limit;

    const docs = await formSchema.find(filter)
      .sort({ [sortBy]: sortOrder === 'desc' ? -1 : 1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await formSchema.countDocuments(filter);

    res.json({
      success: true,
      data: docs,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(total / limit)
      }
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Failed to fetch documents",
      details: error.message
    });
  }
});

// Get Single Document
router.get("/api/documents/:id", async (req, res) => {
  try {
    const doc = await formSchema.findById(req.params.id);
    if (!doc) return res.status(404).json({ success: false, error: "Document not found" });
    res.json({ success: true, data: doc });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Failed to fetch document",
      details: error.message
    });
  }
});

// Update Document
router.put("/api/documents/:id", async (req, res) => {
  try {
    const updatedDoc = await formSchema.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedDoc) return res.status(404).json({ success: false, error: "Document not found" });
    res.json({
      success: true,
      data: updatedDoc,
      message: "Document updated successfully"
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Failed to update document",
      details: error.message
    });
  }
});

// Delete Document
router.delete("/api/documents/:id", async (req, res) => {
  try {
    const deletedDoc = await formSchema.findByIdAndDelete(req.params.id);
    if (!deletedDoc) return res.status(404).json({ success: false, error: "Document not found" });
    res.json({ success: true, message: "Document deleted successfully" });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Failed to delete document",
      details: error.message
    });
  }
});


// ------------------- CLIENT DATA ROUTES -------------------
router.post("/api/clientdata", async (req, res) => {
  try {
    const newClient = await ClientData.create(req.body);
    res.status(201).json({
      success: true,
      data: newClient,
      message: "Client created successfully"
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
});

router.get("/api/clientdata", async (req, res) => {
  try {
    const clients = await ClientData.find();
    res.json({
      success: true,
      data: clients
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

router.put("/api/clientdata/:id", async (req, res) => {
  try {
    const updatedClient = await ClientData.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json({
      success: true,
      data: updatedClient
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
});

router.delete("/api/clientdata/:id", async (req, res) => {
  try {
    await ClientData.findByIdAndDelete(req.params.id);
    res.json({
      success: true,
      message: "Client deleted successfully"
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
});

// ------------------- PROJECT DATA ROUTES -------------------
router.post("/api/projectdata", async (req, res) => {
  try {
    const newProject = await ProjectData.create(req.body);
    res.status(201).json({
      success: true,
      data: newProject,
      message: "Project created successfully"
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
});

router.get("/api/projectdata", async (req, res) => {
  try {
    const projects = await ProjectData.find();
    res.json({
      success: true,
      data: projects
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

router.put("/api/projectdata/:id", async (req, res) => {
  try {
    const updatedProject = await ProjectData.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json({
      success: true,
      data: updatedProject
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
});

router.delete("/api/projectdata/:id", async (req, res) => {
  try {
    await ProjectData.findByIdAndDelete(req.params.id);
    res.json({
      success: true,
      message: "Project deleted successfully"
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
});

// ------------------- TECHNOLOGY DATA ROUTES -------------------
router.post("/api/techdata", async (req, res) => {
  try {
    const newTech = await TechData.create(req.body);
    res.status(201).json({
      success: true,
      data: newTech,
      message: "Technology created successfully"
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
});

router.get("/api/techdata", async (req, res) => {
  try {
    const techs = await TechData.find();
    res.json({
      success: true,
      data: techs
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

router.put("/api/techdata/:id", async (req, res) => {
  try {
    const updatedTech = await TechData.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json({
      success: true,
      data: updatedTech
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
});

router.delete("/api/techdata/:id", async (req, res) => {
  try {
    await TechData.findByIdAndDelete(req.params.id);
    res.json({
      success: true,
      message: "Technology deleted successfully"
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
});




module.exports = router;
