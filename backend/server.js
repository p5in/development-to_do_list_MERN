const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config(); // .env file ko load karne ke liye

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json()); // Body se JSON parse karne ke liye

// MongoDB se connect karein
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected successfully!"))
  .catch((err) => console.error("MongoDB connection error:", err));

// API Routes
const todoRoutes = require("./routes/todos");
app.use("/api/todos", todoRoutes); // Saare todo routes /api/todos par honge

// Server start karein
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
