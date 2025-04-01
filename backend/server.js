const express = require("express");
const cors = require("cors");
require("dotenv").config();
const mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT || 5000;


mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));


app.use(cors({ origin: "*" })); 
app.use(express.json());


app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});


const formRoutes = require("./routes/formRoutes");
app.use("/", formRoutes);


app.get("/", (req, res) => {
  res.send("✅ Server is running...");
});


app.use((err, req, res, next) => {
  console.error("❌ Error:", err);
  res.status(500).json({ error: "Internal Server Error" });
});


app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Backend is running on port ${PORT}`);
});
