import express from 'express';
import { logExercise, getExercises } from '../controllers/exerciseController.js';
import { verifyToken } from '../middleware/authMiddleware.js';
const router = express.Router();

router.post('/logExercise', verifyToken, logExercise);
router.get('/getExercise', verifyToken, getExercises);

export default router;