import EmotionFace from "../models/EmotionFace.js";
import EmotionSpeech from "../models/EmotionSpeech.js";
import { getFaceEmotion } from "../services/modelService.js";
import { getSpeechEmotion } from "../services/modelService.js";

export const createEmotionFace = async (req, res) => {
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

    const modelResult = await getFaceEmotion(req.file);

    console.log("Model Result:", modelResult);

    const emotionFace = new EmotionFace({
      userId: req.userId,
      emotion: modelResult.emotion,
      confidence: modelResult.confidence,
      imageUrl: "",
    });

    await emotionFace.save();

    res.status(201).json(modelResult);
  } catch (error) {
    console.error("Prediction Error:", error);
    res.status(500).json({ error: error.message });
  }
};

export const getEmotionsFace = async (req, res) => {
  try {
    const emotions = await EmotionFace.find({ userId: req.userId });
    res.status(200).json(emotions);
  } catch (error) {
    console.error("Get Emotions Error:", error);
    res.status(500).json({ error: error.message });
  }
};

export const createEmotionSpeech = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No audio provided" });
    }

    console.log("File received:", {
      originalname: req.file.originalname,
      mimetype: req.file.mimetype,
      size: req.file.size,
    });

    const modelResult = await getSpeechEmotion(req.file);

    console.log("Model Result:", modelResult);

    const emotionSpeech = new EmotionSpeech({
      userId: req.userId,
      emotion: modelResult.emotion,
      audioUrl: "",
    });

    await emotionSpeech.save();

    res.status(201).json(modelResult);
  } catch (error) {
    console.error("Prediction Error:", error);
    res.status(500).json({ error: error.message });
  }
};

export const getEmotionsSpeech = async (req, res) => {
  try {
    const emotions = await EmotionSpeech.find();
    res.status(200).json(emotions);
  } catch (error) {
    console.error("Get Emotions Error:", error);
    res.status(500).json({ error: error.message });
  }
};
