import express from 'express';
import { getGroups, createGroup, joinGroup, leaveGroup} from '../controllers/groupController.js';
import { verifyToken } from '../middleware/authMiddleware.js';
const router = express.Router();

router.get('/getGroups', verifyToken, getGroups);
router.post('/createGroup', verifyToken, createGroup);
router.post('/joinGroup', verifyToken, joinGroup);
router.post('/leaveGroup', verifyToken, leaveGroup);

export default router;