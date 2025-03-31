const express = require("express");
const cors = require("cors");
require("dotenv").config();
const mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// Middleware
app.use(cors({ origin: "*" })); // Allow all origins temporarily for testing
app.use(express.json());

// Logging Middleware (for debugging)
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// API Routes
const formRoutes = require("./routes/formRoutes");
app.use("/api/form", formRoutes);

// Default route
app.get("/", (req, res) => {
  res.send("✅ Server is running...");
});

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error("❌ Error:", err);
  res.status(500).json({ error: "Internal Server Error" });
});

// Start server on 0.0.0.0 for Docker
app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Backend is running on port ${PORT}`);
});
