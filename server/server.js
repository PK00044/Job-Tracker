import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import jobRoutes from "./routes/jobRoutes.js"; // ✅ Your route file

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use("/api/jobs", jobRoutes);

app.get("/", (req, res) => {
  res.send("🚀 Job Tracker backend is live!");
});

mongoose.connect(process.env.MONGO_URI)
  .then(() =>
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
  )
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));
