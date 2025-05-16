import express from 'express';
import { getGoals, createGoal, deleteGoal } from '../controllers/goalController.js';
import { verifyToken } from '../middleware/authMiddleware.js';
const router = express.Router();

router.get('/getGoals', verifyToken, getGoals);
router.post('/createGoal', verifyToken, createGoal);
router.delete('/deleteGoal', verifyToken, deleteGoal);

export default router;