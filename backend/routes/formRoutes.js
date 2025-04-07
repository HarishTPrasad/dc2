// const express = require("express");
// const router = express.Router();
// const formSchema = require("../models/FormDataModel"); 

// router.use(express.json());
// router.use(express.urlencoded({ extended: true }));


// router.post("/api/submit", async (req, res) => {
//   try {
//     console.log("Received Data:", req.body); 
    
//     const newDoc = await formSchema.create(req.body); 

//     res.json({ 
//       received: true, 
//       savedData: newDoc, 
//       message: "Document saved successfully" 
//     });

//   } catch (error) {
//     console.error("❌ Error saving document:", error);
//     res.status(500).json({ 
//       error: "Failed to save document",
//       details: error.message 
//     });
//   }
// });


// router.get("/api/documents", async (req, res) => {
//   try {
//     const docs = await formSchema.find().sort({ createdAt: -1 });
//     res.json(docs);
//   } catch (error) {
//     res.status(500).json({ 
//       error: "Failed to fetch documents",
//       details: error.message 
//     });
//   }
// });


// router.get("/api/test-route", (req, res) => {
//   res.json({ status: "Backend is working!" });
// });

// module.exports = router;






// const express = require("express");
// const router = express.Router();
// const formSchema = require("../models/FormDataModel"); 

// router.use(express.json());
// router.use(express.urlencoded({ extended: true }));

// // Create a new document
// router.post("/api/submit", async (req, res) => {
//   try {
//     console.log("Received Data:", req.body); 
    
//     const newDoc = await formSchema.create(req.body); 

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

// // Get all documents with filtering and sorting options
// router.get("/api/documents", async (req, res) => {
//   try {
//     // Extract query parameters
//     const { 
//       status, 
//       assignedTo, 
//       sortBy = 'createdAt', 
//       sortOrder = 'desc',
//       page = 1,
//       limit = 10
//     } = req.query;

//     // Build filter object
//     const filter = {};
//     if (status) filter.implementationStatus = status;
//     if (assignedTo) filter.implementationAssigned = assignedTo;

//     // Calculate pagination
//     const skip = (page - 1) * limit;

//     // Get documents with filtering, sorting and pagination
//     const docs = await formSchema.find(filter)
//       .sort({ [sortBy]: sortOrder === 'desc' ? -1 : 1 })
//       .skip(skip)
//       .limit(parseInt(limit));

//     // Get total count for pagination info
//     const total = await formSchema.countDocuments(filter);

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
//     res.status(500).json({ 
//       success: false,
//       error: "Failed to fetch documents",
//       details: error.message 
//     });
//   }
// });

// // Get a single document by ID
// router.get("/api/documents/:id", async (req, res) => {
//   try {
//     const doc = await formSchema.findById(req.params.id);
//     if (!doc) {
//       return res.status(404).json({
//         success: false,
//         error: "Document not found"
//       });
//     }
//     res.json({
//       success: true,
//       data: doc
//     });
//   } catch (error) {
//     res.status(500).json({ 
//       success: false,
//       error: "Failed to fetch document",
//       details: error.message 
//     });
//   }
// });

// // Update a document
// router.put("/api/documents/:id", async (req, res) => {
//   try {
//     const updatedDoc = await formSchema.findByIdAndUpdate(
//       req.params.id,
//       req.body,
//       { new: true, runValidators: true }
//     );

//     if (!updatedDoc) {
//       return res.status(404).json({
//         success: false,
//         error: "Document not found"
//       });
//     }

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

// // Delete a document
// router.delete("/api/documents/:id", async (req, res) => {
//   try {
//     const deletedDoc = await formSchema.findByIdAndDelete(req.params.id);

//     if (!deletedDoc) {
//       return res.status(404).json({
//         success: false,
//         error: "Document not found"
//       });
//     }

//     res.json({
//       success: true,
//       message: "Document deleted successfully"
//     });

//   } catch (error) {
//     res.status(500).json({ 
//       success: false,
//       error: "Failed to delete document",
//       details: error.message 
//     });
//   }
// });

// // Test route
// router.get("/api/test-route", (req, res) => {
//   res.json({ 
//     success: true,
//     status: "Backend is working!" 
//   });
// });

// module.exports = router;

const express = require("express");
const router = express.Router();
const formSchema = require("../models/FormDataModel"); 

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

// Create a new document
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

// Get all documents (simplified version)
router.get("/api/documents", async (req, res) => {
  try {
    // Basic filtering
    const filter = {};
    
    // Status filter (supports both implementationStatus and changeRequestStatus)
    if (req.query.status) {
      filter.$or = [
        { implementationStatus: req.query.status },
        { 
          $and: [
            { implementationStatus: { $exists: false } },
            { 'changeRequestStatus.accepted': req.query.status === 'Pending Approval' },
            { 'changeRequestStatus.rejected': false }
          ]
        },
        {
          $and: [
            { implementationStatus: { $exists: false } },
            { 'changeRequestStatus.rejected': req.query.status === 'Rejected' }
          ]
        }
      ];
    }

    // Assigned to filter
    if (req.query.assignedTo) {
      filter.implementationAssigned = req.query.assignedTo;
    }

    // Default sorting by creation date
    const sort = { createdAt: -1 };
    
    // Optional sorting
    if (req.query.sortBy) {
      sort[req.query.sortBy] = req.query.sortOrder === 'asc' ? 1 : -1;
    }

    const docs = await formSchema.find(filter)
      .sort(sort);

    res.json({
      success: true,
      data: docs
    });

  } catch (error) {
    console.error("❌ Error fetching documents:", error);
    res.status(500).json({ 
      success: false,
      error: "Failed to fetch documents",
      details: error.message 
    });
  }
});

// Get a single document by ID
router.get("/api/documents/:id", async (req, res) => {
  try {
    const doc = await formSchema.findById(req.params.id);
    if (!doc) {
      return res.status(404).json({
        success: false,
        error: "Document not found"
      });
    }
    res.json({
      success: true,
      data: doc
    });
  } catch (error) {
    console.error("❌ Error fetching document:", error);
    res.status(500).json({ 
      success: false,
      error: "Failed to fetch document",
      details: error.message 
    });
  }
});

// Update a document
router.put("/api/documents/:id", async (req, res) => {
  try {
    const updatedDoc = await formSchema.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedDoc) {
      return res.status(404).json({
        success: false,
        error: "Document not found"
      });
    }

    res.json({
      success: true,
      data: updatedDoc,
      message: "Document updated successfully"
    });

  } catch (error) {
    console.error("❌ Error updating document:", error);
    res.status(500).json({ 
      success: false,
      error: "Failed to update document",
      details: error.message 
    });
  }
});

// Delete a document
router.delete("/api/documents/:id", async (req, res) => {
  try {
    const deletedDoc = await formSchema.findByIdAndDelete(req.params.id);

    if (!deletedDoc) {
      return res.status(404).json({
        success: false,
        error: "Document not found"
      });
    }

    res.json({
      success: true,
      message: "Document deleted successfully"
    });

  } catch (error) {
    console.error("❌ Error deleting document:", error);
    res.status(500).json({ 
      success: false,
      error: "Failed to delete document",
      details: error.message 
    });
  }
});

module.exports = router;