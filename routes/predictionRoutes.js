import express from 'express';
import multer from 'multer';
import { createPrediction, getUserPredictions, saveResults } from '../controllers/predictionController.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ 
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
      return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
  }
});

router.post('/', auth, upload.single('image'), createPrediction);
router.get('/history', auth, getUserPredictions);
router.post('/save', auth, saveResults); // New endpoint for saving results

export default router;