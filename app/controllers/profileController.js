import db from '../db/db.js';
import { calculateBMI } from '../utils/bmi.js';

export const getProfile = async (req, res) => {
    try {
      const  userID  = req.userID;
      const userDetails = await db('users').where({ userID }).first();
      const accountDetails = await db('account').select('username', 'email').where({ userID }).first();

      console.log("[Backend] User Details:", userDetails); 
      console.log("[Backend] Account Details:", accountDetails);
      if (!userDetails || !accountDetails) {
        return res.status(404).json({ error: 'User not found' });
      }
      const BMI = calculateBMI(userDetails.weight, userDetails.height);
      console.log("[Backend] Calculated BMI:", BMI);
      res.json({ ...userDetails, ...accountDetails, BMI });
    } catch (err) {
      console.error('Get Profile Error:', err);
      res.status(500).json({ error: err.message });
    }
  };


export const updateProfile = async (req, res) => {
  try {
    const  userID  = req.userID;
    const { realname, gender, height, weight, goalWeight, username, email } = req.body;
    if (!realname || !gender || !height || !weight || !goalWeight || !username || !email) {
      return res.status(400).json({ error: "All fields must be provided" });
    }

    const parsedWeight = parseFloat(weight);
    const parsedGoalWeight = parseFloat(goalWeight);
    const parsedHeight = parseFloat(height);

    if (isNaN(parsedWeight)) {
      return res.status(400).json({ message: "Weight must be a valid number" });
    }
    if (parsedWeight < 20 || parsedWeight > 635) {
      return res.status(400).json({ message: "Weight must be between 20kg and 635kg" });
    }
    if (isNaN(parsedGoalWeight)) {
      return res.status(400).json({ message: "Goal weight must be a valid number" });
    }
    if (parsedGoalWeight < 20 || parsedGoalWeight > 635) {
      return res.status(400).json({ message: "Goal weight must be between 20kg and 635kg" });
    }
    if (parsedHeight > 300) {
      return res.status(400).json({ message: "Height shouldn't exceed 300cm" });
    }



    const BMI = calculateBMI(weight, height);
    console.log("[Backend] Calculated BMI:", BMI);
    console.log("[Backend] Updating user with:", {
      realname, gender, height, weight, BMI, goalWeight
    });
    await db('users').where({ userID }).update({ realname, gender, height, weight, BMI, goalWeight });
    await db('account').where({ userID }).update({ username, email });

    const userDetails = await db('users').where({ userID }).first();
    const accountDetails = await db('account').select('username', 'email').where({ userID }).first();

    res.json({ ...userDetails, ...accountDetails }); 
  } catch (err) {
    console.error("Update Profile Error:", err);
    res.status(500).json({ error: "Failed to update profile" });
  }
};

 