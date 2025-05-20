import RiskAnalysis from "../models/RiskAnalysis.js";
import { getRiskAnalysis } from "../services/modelService.js";

export const createRiskAnalysis = async (req, res) => {
  try {
    console.log("Request Body:", req.body);
    const riskAnalysis = await getRiskAnalysis(req.body.data);

    const result = {
      confidence: riskAnalysis[0].Predictions.XGBoost.Confidence,
      prediction: riskAnalysis[0].Predictions.XGBoost.Prediction,
    };

    if (result) {
      const newRiskAnalysis = new RiskAnalysis({
        userId: req.body.userId,
        userName: req.body.userName,
        data: req.body.data,
        result: result,
        staffId: req.body.staffId,
      });

      await newRiskAnalysis.save();
    } else {
      return res.status(400).json({ error: "Invalid risk analysis result" });
    }

    // await newRiskAnalysis.save();

    res.status(201).json(riskAnalysis);
  } catch (error) {
    console.error("Risk Analysis Error:", error);
    res.status(500).json({ error: error.message });
  }
};

export const getAllRiskAnalysis = async (req, res) => {
  try {
    const riskAnalysis = await RiskAnalysis.find().sort({ createdAt: -1 });
    res.status(200).json(riskAnalysis);
  } catch (error) {
    console.error("Risk Analysis Error:", error);
    res.status(500).json({ error: error.message });
  }
};
