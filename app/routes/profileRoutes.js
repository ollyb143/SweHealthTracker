import express from 'express';
import { getProfile, updateProfile } from '../controllers/profileController.js';
import sessionChecker from '../middleware/sessionChecker.js';
const router = express.Router();

router.get('/', sessionChecker, getProfile);
router.put('/', sessionChecker, updateProfile);

export default router; 