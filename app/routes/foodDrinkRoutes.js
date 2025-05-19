import express from 'express';
import {
  getConsumables,
  createConsumable,
  updateConsumable,
  deleteConsumable,
} from '../controllers/foodDrinkController.js';
import sessionChecker from '../middleware/sessionChecker.js';

const router = express.Router();

router.get('/', sessionChecker, getConsumables);
router.post('/', sessionChecker, createConsumable);
router.put('/:id',  sessionChecker, updateConsumable);
router.delete('/:id', sessionChecker, deleteConsumable);

export default router;
