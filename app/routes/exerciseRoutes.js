import express from 'express';
import { logExercise, getExercises } from '../controllers/exerciseController.js';
import { verifyToken } from '../middleware/authMiddleware.js';
const router = express.Router();

router.post('/', verifyToken, logExercise);
router.get('/', verifyToken, getExercises);

export default router;