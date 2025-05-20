import Prediction from "../models/Prediction.js";
import { getPrediction } from "../services/modelService.js";

export const createPrediction = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No image provided" });
    }

    console.log("File received:", {
      originalname: req.file.originalname,
      mimetype: req.file.mimetype,
      size: req.file.size,
      buffer: req.file.buffer ? "Buffer present" : "No buffer",
    });

    const modelResult = await getPrediction(req.file);

    console.log("Model Result:", modelResult);

    // Create a new prediction with an ID that can be referenced later
    const prediction = new Prediction({
      userId: req.userId,
      prediction: modelResult.prediction,
      confidence: modelResult.confidence,
      imageUrl: "", // Implement image storage if needed
    });

    // Save the prediction to get an ID
    const savedPrediction = await prediction.save();

    // Return the model result along with the prediction ID
    res.status(201).json({
      ...modelResult,
      id: savedPrediction._id // Include the MongoDB ID in the response
    });
  } catch (error) {
    console.error("Prediction Error:", error);
    res.status(500).json({
      error: error.message,
      details: process.env.NODE_ENV === "development" ? error.stack : undefined,
    });
  }
};

export const getUserPredictions = async (req, res) => {
  try {
    const predictions = await Prediction.find({ userId: req.userId }).sort({
      createdAt: -1,
    });
    res.json(predictions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// New controller function for saving additional result details
export const saveResults = async (req, res) => {
  try {
    const { predictionId, details } = req.body;
    
    if (!predictionId) {
      return res.status(400).json({ error: "Prediction ID is required" });
    }
    
    console.log("Saving results for prediction:", predictionId);
    console.log("Details:", details);
    
    // Find the prediction and ensure it belongs to the authenticated user
    let prediction;
    try {
      prediction = await Prediction.findOne({
        _id: predictionId,
        userId: req.userId
      });
    } catch (findError) {
      console.error("Error finding prediction:", findError);
      return res.status(404).json({ 
        error: "Invalid prediction ID format",
        details: process.env.NODE_ENV === "development" ? findError.message : undefined
      });
    }
    
    if (!prediction) {
      return res.status(404).json({ error: "Prediction not found or unauthorized" });
    }
    
    // Validate details structure to match your types
    if (details) {
      // Ensure regions is an array if present
      if (details.regions && !Array.isArray(details.regions)) {
        return res.status(400).json({ error: "Details.regions must be an array" });
      }
      
      // Ensure notes and recommendations are strings if present
      if (details.notes && typeof details.notes !== 'string') {
        return res.status(400).json({ error: "Details.notes must be a string" });
      }
      
      if (details.recommendations && typeof details.recommendations !== 'string') {
        return res.status(400).json({ error: "Details.recommendations must be a string" });
      }
    }
    
    // Update the prediction with additional details
    prediction.details = details;
    await prediction.save();
    
    res.status(200).json({ 
      message: "Results saved successfully", 
      predictionId,
      updatedAt: new Date().toISOString()
    });
  } catch (error) {
    console.error("Save Results Error:", error);
    res.status(500).json({ 
      error: error.message,
      details: process.env.NODE_ENV === "development" ? error.stack : undefined 
    });
  }
};