import express from 'express';
import { getProfile } from '../controllers/profileController.js';
import { verifyToken } from '../middleware/authMiddleware.js';
const router = express.Router();

router.get('/', verifyToken, getProfile);

export default router;