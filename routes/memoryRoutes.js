import express from "express";
import {
  createMemory,
  getAllMemories,
  getAllMemoriesWithImages,
} from "../controllers/memoryController.js";

const router = express.Router();

router.post("/", createMemory);
router.get("/:userId", getAllMemories);
router.get("/:userId/images", getAllMemoriesWithImages);

export default router;
