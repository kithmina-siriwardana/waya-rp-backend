import mongoose from "mongoose";

const memorySchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    topic: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    imageUrl: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Memory = mongoose.model("Memory", memorySchema);

export default Memory;
