const express = require("express");
const router = express.Router();

// Models
const User = require("../models/User");
const formSchema = require("../models/FormDataModel");



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


const ClientData = require('../models/ClientData'); // Adjust the path as needed

// Middleware to get a single client by ID
async function getClient(req, res, next) {
  let client;
  try {
    client = await ClientData.findById(req.params.id);
    if (client == null) {
      return res.status(404).json({ message: 'Cannot find client' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.client = client;
  next();
}

// CREATE - Add a new client
router.post('/api/clientdata', async (req, res) => {
  const clientData = new ClientData({
    client: {
      clientname: req.body.client?.clientname,
      requestor: req.body.client?.requestor,
      approver: req.body.client?.approver,
      department: req.body.client?.department,
      phoneno: req.body.client?.phoneno
    }
  });

  try {
    const newClient = await clientData.save();
    res.status(201).json(newClient);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// READ - Get all clients
router.get('/api/clientdata', async (req, res) => {
  try {
    const clients = await ClientData.find();
    res.json(clients);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// READ - Get one client by ID
router.get('/api/clientdata/:id', getClient, (req, res) => {
  res.json(res.client);
});

// UPDATE - Update a client
router.patch('/api/clientdata/:id', getClient, async (req, res) => {
  if (req.body.client?.clientname != null) {
    res.client.client.clientname = req.body.client.clientname;
  }
  if (req.body.client?.requestor != null) {
    res.client.client.requestor = req.body.client.requestor;
  }
  if (req.body.client?.approver != null) {
    res.client.client.approver = req.body.client.approver;
  }
  if (req.body.client?.department != null) {
    res.client.client.department = req.body.client.department;
  }
  if (req.body.client?.phoneno != null) {
    res.client.client.phoneno = req.body.client.phoneno;
  }

  try {
    const updatedClient = await res.client.save();
    res.json(updatedClient);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE - Remove a client
router.delete('/api/clientdata/:id', getClient, async (req, res) => {
  try {
    await res.client.remove();
    res.json({ message: 'Deleted client' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});






const ProjectData = require('../models/ProjectData'); // Adjust the path as needed

// Middleware to get a single project by ID
async function getProject(req, res, next) {
  let project;
  try {
    project = await ProjectData.findById(req.params.id);
    if (project == null) {
      return res.status(404).json({ message: 'Cannot find project' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.project = project;
  next();
}

// CREATE - Add a new project
router.post('/api/projectdata', async (req, res) => {
  const projectData = new ProjectData({
    project: req.body.project
  });

  try {
    const newProject = await projectData.save();
    res.status(201).json(newProject);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// READ - Get all projects
router.get('/api/projectdata', async (req, res) => {
  try {
    const projects = await ProjectData.find();
    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// READ - Get one project by ID
router.get('/api/projectdata/:id', getProject, (req, res) => {
  res.json(res.project);
});

// UPDATE - Update a project
router.patch('/api/projectdata/:id', getProject, async (req, res) => {
  if (req.body.project != null) {
    res.project.project = req.body.project;
  }

  try {
    const updatedProject = await res.project.save();
    res.json(updatedProject);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE - Remove a project
router.delete('/api/projectdata/:id', getProject, async (req, res) => {
  try {
    await res.project.remove();
    res.json({ message: 'Deleted project' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});





const TechData = require('../models/TechData'); // Adjust path as needed

// Middleware to get technology by ID
async function getTechnology(req, res, next) {
  let technology;
  try {
    technology = await TechData.findById(req.params.id);
    if (!technology) {
      return res.status(404).json({ message: 'Technology not found' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.technology = technology;
  next();
}

// CREATE - Add new technology
router.post('/api/techdata', async (req, res) => {
  const techData = new TechData({
    technology: req.body.technology
  });

  try {
    const newTech = await techData.save();
    res.status(201).json(newTech);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// READ - Get all technologies
router.get('/api/techdata', async (req, res) => {
  try {
    const technologies = await TechData.find();
    res.json(technologies);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// READ - Get single technology
router.get('/api/techdata/:id', getTechnology, (req, res) => {
  res.json(res.technology);
});

// UPDATE - Update technology
router.patch('/api/techdata/:id', getTechnology, async (req, res) => {
  if (req.body.technology != null) {
    res.technology.technology = req.body.technology;
  }

  try {
    const updatedTech = await res.technology.save();
    res.json(updatedTech);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE - Remove technology
router.delete('/api/techdata/:id', getTechnology, async (req, res) => {
  try {
    await res.technology.deleteOne();
    res.json({ message: 'Technology deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});




module.exports = router;
