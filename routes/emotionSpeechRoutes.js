import express from "express";
import multer from "multer";
import {
  createEmotionSpeech,
  getEmotionsSpeech,
} from "../controllers/emotionController.js";
// import { auth } from '../middleware/auth.js';

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter: (req, file, cb) => {
    if (!file.originalname.match(/\.(mp3|wav|m4a)$/)) {
      return cb(new Error("Only audio files are allowed!"), false);
    }
    cb(null, true);
  },
});

router.post("/", upload.single("audio"), createEmotionSpeech);
router.get("/", getEmotionsSpeech);

export default router;
