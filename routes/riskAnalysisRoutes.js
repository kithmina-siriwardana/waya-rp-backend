import express from "express";
import {
  createRiskAnalysis,
  getAllRiskAnalysis,
} from "../controllers/riskAnalysisController.js";
// import { auth } from "../middleware/auth.js";

const router = express.Router();

router.post("/", createRiskAnalysis);
router.get("/:userId", getAllRiskAnalysis);

export default router;
