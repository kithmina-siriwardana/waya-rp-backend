import Memory from "../models/Memory.js";

export const createMemory = async (req, res) => {
  const { userId, topic, description, date, imageUrl } = req.body;

  try {
    const newMemory = new Memory({
      userId,
      topic,
      description,
      date,
      imageUrl,
    });
    await newMemory.save();
    res.status(201).json(newMemory);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getAllMemories = async (req, res) => {
  try {
    const memories = await Memory.find({ userId: req.params.userId });
    res.status(200).json(memories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getAllMemoriesWithImages = async (req, res) => {
  try {
    const memories = await Memory.find({
      userId: req.params.userId,
      imageUrl: { $ne: null },
    });
    res.status(200).json(memories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
