import express from 'express';
import { verifyToken } from '../middleware/authMiddleware.js';
import { logWeight, getWeightHistory, deleteWeightLog } from '../controllers/dashboardController.js';

const router = express.Router();

router.post('/logWeight', verifyToken, logWeight);
router.get('/weightHistory', verifyToken, getWeightHistory);
router.delete('/deleteWeightLog/:weightID', verifyToken,deleteWeightLog);
  

export default router;
   