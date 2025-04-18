const express = require("express");
const router = express.Router();

// Models
const User = require("../models/User");
const formSchema = require("../models/FormDataModel");
const AutoData = require("../models/AutoData");
// const Ticket = require("../models/Ticket");

// Middleware
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

// ----------------------- USER ROUTES -----------------------

// CREATE User
router.post("/api/users", async (req, res) => {
  try {
    const { username, password } = req.body;
    const newUser = await User.create({ username, password });
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
    const { username, password } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { username, password },
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


// CREATE - POST new AutoData
router.post('/api/autodata', async (req, res) => {
  try {
    const newAutoData = new AutoData(req.body);
    const savedAutoData = await newAutoData.save();
    res.status(201).json(savedAutoData);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// READ ALL - GET all AutoData
router.get('/api/autodata', async (req, res) => {
  try {
    const autoDataList = await AutoData.find();
    res.json(autoDataList);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// READ ONE - GET single AutoData by ID
router.get('/api/autodata/:id', async (req, res) => {
  try {
    const autoData = await AutoData.findById(req.params.id);
    if (!autoData) {
      return res.status(404).json({ message: 'AutoData not found' });
    }
    res.json(autoData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// UPDATE - PUT update AutoData by ID
router.put('/api/autodata/:id', async (req, res) => {
  try {
    const updatedAutoData = await AutoData.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedAutoData) {
      return res.status(404).json({ message: 'AutoData not found' });
    }
    res.json(updatedAutoData);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE - DELETE AutoData by ID
router.delete('/api/autodata/:id', async (req, res) => {
  try {
    const deletedAutoData = await AutoData.findByIdAndDelete(req.params.id);
    if (!deletedAutoData) {
      return res.status(404).json({ message: 'AutoData not found' });
    }
    res.json({ message: 'AutoData deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// // ------------------- Ticket / DOC ROUTES -------------------

// // Submit New Form
// router.post("/api/ticket", async (req, res) => {
//   try {
//     console.log("Received Data:", req.body);
//     const newDoc = await Ticket.create(req.body);
//     res.status(201).json({
//       success: true,
//       data: newDoc,
//       message: "Document saved successfully"
//     });
//   } catch (error) {
//     console.error("❌ Error saving document:", error);
//     res.status(500).json({
//       success: false,
//       error: "Failed to save document",
//       details: error.message
//     });
//   }
// });

// router.get("/api/ticket", async (req, res) => {
//   try {
//     const {
//       sortBy = 'createdAt',
//       sortOrder = 'desc',
//       page = 1,
//       limit = 10
//     } = req.query;

//     const skip = (page - 1) * limit;

//     const docs = await Ticket.find({}) // Removed filter object
//       .sort({ [sortBy]: sortOrder === 'desc' ? -1 : 1 })
//       .skip(skip)
//       .limit(parseInt(limit));

//     const total = await Ticket.countDocuments({}); // Removed filter object

//     res.json({
//       success: true,
//       data: docs,
//       pagination: {
//         total,
//         page: parseInt(page),
//         limit: parseInt(limit),
//         totalPages: Math.ceil(total / limit)
//       }
//     });
//   } catch (error) {
//     console.error("Error fetching tickets:", error);
//     res.status(500).json({ success: false, error: "Internal Server Error" });
//   }
// });

// // Get Single Document
// router.get("/api/ticket/:id", async (req, res) => {
//   try {
//     const doc = await Ticket.findById(req.params.id);
//     if (!doc) return res.status(404).json({ success: false, error: "Document not found" });
//     res.json({ success: true, data: doc });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       error: "Failed to fetch document",
//       details: error.message
//     });
//   }
// });

// // Update Document
// router.put("/api/ticket/:id", async (req, res) => {
//   try {
//     const updatedDoc = await Ticket.findByIdAndUpdate(
//       req.params.id,
//       req.body,
//       { new: true, runValidators: true }
//     );
//     if (!updatedDoc) return res.status(404).json({ success: false, error: "Document not found" });
//     res.json({
//       success: true,
//       data: updatedDoc,
//       message: "Document updated successfully"
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       error: "Failed to update document",
//       details: error.message
//     });
//   }
// });

// // Delete Document
// router.delete("/api/ticket/:id", async (req, res) => {
//   try {
//     const deletedDoc = await Ticket.findByIdAndDelete(req.params.id);
//     if (!deletedDoc) return res.status(404).json({ success: false, error: "Document not found" });
//     res.json({ success: true, message: "Document deleted successfully" });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       error: "Failed to delete document",
//       details: error.message
//     });
//   }
// });


// router.post("/api/ticket/:id/comment", async (req, res) => {
//   try {
//     const ticket = await Ticket.findById(req.params.id);
//     if (!ticket) return res.status(404).json({ success: false, error: "Ticket not found" });

//     const newComment = {
//       commenttext: req.body.commenttext,
//       commentby: req.body.commentby,
//     };

//     ticket.comment.push(newComment);
//     await ticket.save();

//     res.status(201).json({
//       success: true,
//       data: ticket,
//       message: "Comment added successfully"
//     });
//   } catch (error) {
//     console.error("Error adding comment:", error);
//     res.status(500).json({
//       success: false,
//       error: "Failed to add comment",
//       details: error.message
//     });
//   }
// });

// // Get Comments for a Ticket
// router.get("/api/ticket/:id/comment", async (req, res) => {
//   try {
//     const ticket = await Ticket.findById(req.params.id);
//     if (!ticket) return res.status(404).json({ success: false, error: "Ticket not found" });

//     res.json({
//       success: true,
//       data: ticket.comment,
//       message: "Comments retrieved successfully"
//     });
//   } catch (error) {
//     console.error("Error retrieving comments:", error);
//     res.status(500).json({
//       success: false,
//       error: "Failed to retrieve comments",
//       details: error.message
//     });
//   }
// });

// // Delete a Comment from a Ticket
// router.delete("/api/ticket/:id/comment/:commentId", async (req, res) => {
//   try {
//     const ticket = await Ticket.findById(req.params.id);
//     if (!ticket) return res.status(404).json({ success: false, error: "Ticket not found" });

//     const commentIndex = ticket.comment.findIndex(comment => comment._id.toString() === req.params.commentId);
//     if (commentIndex === -1) return res.status(404).json({ success: false, error: "Comment not found" });

//     ticket.comment.splice(commentIndex, 1);
//     await ticket.save();

//     res.json({
//       success: true,
//       data: ticket,
//       message: "Comment deleted successfully"
//     });
//   } catch (error) {
//     console.error("Error deleting comment:", error);
//     res.status(500).json({
//       success: false,
//       error: "Failed to delete comment",
//       details: error.message
//     });
//   }
// });






// Test Route
router.get("/api/test-route", (req, res) => {
  res.json({ success: true, status: "Backend is working!" });
});

module.exports = router;


