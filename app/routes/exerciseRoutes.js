import express from "express";
import sessionChecker from "../middleware/sessionChecker.js";
import { logExercise, getExercises, deleteExercise, getExerciseStats } from "../controllers/exerciseController.js";

const router = express.Router();

router.post("/", sessionChecker, logExercise);
router.get("/", sessionChecker, getExercises);
router.delete("/:id", sessionChecker, deleteExercise);
router.get("/stats", sessionChecker, getExerciseStats);

export default router;
