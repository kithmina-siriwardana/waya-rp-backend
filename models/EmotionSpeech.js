import mongoose from "mongoose";

const emotionSpeechSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: false,
  },
  emotion: {
    type: String,
  },
  confidence: {
    type: Number,
    required: false,
  },
  audioUrl: {
    type: String,
    required: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const EmotionSpeech = mongoose.model("EmotionSpeech", emotionSpeechSchema);

export default EmotionSpeech;
