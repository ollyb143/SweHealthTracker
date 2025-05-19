import express from "express";
import sessionChecker from "../middleware/sessionChecker.js";
import { logWeight, getWeightHistory, deleteWeightLog } from "../controllers/dashboardController.js";

const router = express.Router();
router.use(sessionChecker);

router.post("/logWeight", logWeight);
router.get("/weightHistory", getWeightHistory);
router.delete("/deleteWeightLog/:weightID", deleteWeightLog);

export default router;
