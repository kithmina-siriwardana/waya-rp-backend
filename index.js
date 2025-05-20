import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import connectDB from "./config/database.js";
import authRoutes from "./routes/authRoutes.js";
import predictionRoutes from "./routes/predictionRoutes.js";
import riskAnalysisRoutes from "./routes/riskAnalysisRoutes.js";
import emotionFaceRoutes from "./routes/emotionFaceRoutes.js";
import emotionSpeechRoutes from "./routes/emotionSpeechRoutes.js";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Connect to MongoDB
connectDB();

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/predictions", predictionRoutes);
app.use("/api/predict/analyze-risk", riskAnalysisRoutes);

app.use("/api/predict/analyze-face", emotionFaceRoutes);
app.use("/api/predict/analyze-speech", emotionSpeechRoutes);

// Error handling
app.use((err, _req, res, _next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
