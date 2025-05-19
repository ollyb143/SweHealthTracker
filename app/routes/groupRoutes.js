import express from 'express';
import sessionChecker from '../middleware/sessionChecker.js';
import {
  createGroup,
  getGroups,
  leaveGroup,
} from '../controllers/groupController.js';

const router = express.Router();

router.use(sessionChecker);

router.get('/', getGroups);
router.post('/', createGroup);
router.post('/leave', leaveGroup);

export default router;
