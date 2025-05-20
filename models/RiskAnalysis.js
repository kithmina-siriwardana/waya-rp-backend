import mongoose from "mongoose";

const dataSchema = {
  Age: Number,
  Gender: Number,
  Ethnicity: Number,
  EducationLevel: Number,
  BMI: Number,
  Smoking: Number,
  AlcoholConsumption: Number,
  PhysicalActivity: Number,
  DietQuality: Number,
  SleepQuality: Number,
  FamilyHistoryAlzheimers: Number,
  CardiovascularDisease: Number,
  Diabetes: Number,
  Depression: Number,
  HeadInjury: Number,
  Hypertension: Number,
  SystolicBP: Number,
  DiastolicBP: Number,
  CholesterolTotal: Number,
  CholesterolLDL: Number,
  CholesterolHDL: Number,
  CholesterolTriglycerides: Number,
  MMSE: Number,
  FunctionalAssessment: Number,
  MemoryComplaints: Number,
  BehavioralProblems: Number,
  ADL: Number,
  Confusion: Number,
  Disorientation: Number,
  PersonalityChanges: Number,
  DifficultyCompletingTasks: Number,
  Forgetfulness: Number,
};

const resultSchema = {
  confidence: Number,
  prediction: Number,
};

const riskAnalysisSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    userName: { type: String },
    data: dataSchema,
    result: resultSchema,
    staffId: { type: String, required: true },
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
  }
);

const RiskAnalysis = mongoose.model("RiskAnalysis", riskAnalysisSchema);

export default RiskAnalysis;
