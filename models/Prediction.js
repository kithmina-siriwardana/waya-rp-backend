import mongoose from 'mongoose';

const predictionSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User' 
  },
  prediction: String,
  confidence: Number,
  imageUrl: String,
  details: {
    type: Object,
    default: null
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
});

export default mongoose.models.Prediction || mongoose.model('Prediction', predictionSchema);