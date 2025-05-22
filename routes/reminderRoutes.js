import express from "express";
import {
  createReminder,
  getAllReminders,
  updateReminder,
  deleteReminder,
} from "../controllers/reminderController.js";

const router = express.Router();

router.post("/", createReminder);
router.get("/:userId", getAllReminders);
router.put("/:id", updateReminder);
router.delete("/:id", deleteReminder);

export default router;
