// /app/controllers/exerciseController.js
import db from '../db/db.js';

export const logExercise = async (req, res) => {
    const { userID } = req.user;
    const { exerciseType, duration, distance, caloriesBurned, entryDate } = req.body;
  
    try {
      await db('exercise').insert({ userID, exerciseType, duration, distance, caloriesBurned, entryDate });
      res.status(200).json({ message: 'Exercise logged' });
    } catch (err) {
      console.error('Log Exercise Error:', err);
      res.status(500).json({ error: err.message });
    }
  };
  
  export const getExercises = async (req, res) => {
    try {
      const exercises = await db('exercise').where({ userID: req.user.userID });
      res.json(exercises);
    } catch (err) {
      console.error('Get Exercises Error:', err);
      res.status(500).json({ error: err.message });
    }
  };
  