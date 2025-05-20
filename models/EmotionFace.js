import mongoose from "mongoose";

const emotionFaceSchema = new mongoose.Schema({
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
  imageUrl: {
    type: String,
    required: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const EmotionFace = mongoose.model("EmotionFace", emotionFaceSchema);

export default EmotionFace;
