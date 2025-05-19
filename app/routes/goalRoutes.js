import express from 'express';
import {
  getGoals,
  createGoal,
  updateGoal,
  deleteGoal,
  toggleGoalComplete,
} from '../controllers/goalController.js';
import sessionChecker from '../middleware/sessionChecker.js';

const router = express.Router();

router.use(sessionChecker);

router.get('/', getGoals);
router.post('/', createGoal);
router.put('/:id', updateGoal);
router.delete('/:id', deleteGoal);
router.patch('/complete/:id', toggleGoalComplete);

export default router;
