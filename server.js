import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import studentRoutes from "./routes/studentRoutes.js";

dotenv.config();

const app = express();
app.use(express.json());

// Simple CORS for production
app.use(cors({
  origin: [
    'http://localhost:3000',
    'http://localhost:5173',
    'https://scholario-mern-mern.vercel.app/' // REPLACE WITH YOUR ACTUAL FRONTEND DOMAIN
  ]
}));

app.use("/student", studentRoutes);

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("mongoDB connected"))
  .catch((err => console.log("DB connection error: ", err)));

// Simple route
app.get("/", (req, res) => {
  res.send("mongoDB with nodejs is working")
})

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));