// /app/controllers/profileController.js
import db from '../db/db.js';

export const getProfile = async (req, res) => {
    try {
      const { userID } = req.user;
      const userDetails = await db('users').where({ userID }).first();
      const accountDetails = await db('account').select('username', 'email').where({ userID }).first();
  
      if (!userDetails || !accountDetails) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      res.json({ ...userDetails, ...accountDetails });
    } catch (err) {
      console.error('Get Profile Error:', err);
      res.status(500).json({ error: err.message });
    }
  };
  