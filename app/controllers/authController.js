// 1. BACKEND: Express Controllers and Routes (MVC style)

// /app/controllers/authController.js
import db from '../db/db.js';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import { calculateBMI } from '../utils/bmi.js';


const JWT_SECRET = "secret";

export const register = async (req, res) => {
    try {
      const { realname, height, weight, dob, gender, goalWeight, username, email, password } = req.body;
      const BMI = calculateBMI(weight, height);
      console.log("[Backend] Weight:", weight, "[Backend] Height:", height);
      console.log("[Backend] Calculated BMI during registration:", BMI);



      const hashedPassword = crypto.createHash('md5').update(password).digest('hex');
  
      const [userID] = await db('users').insert({ realname, height, weight, dob, gender, BMI, goalWeight }).returning('userID');
      const finalUserID = typeof userID === 'object' && userID.userID ? userID.userID : userID;
  
      await db('account').insert({ userID: finalUserID, username, email, password: hashedPassword });
  
      res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
      console.error('Registration Error:', err);
      res.status(500).json({ error: err.message });
    }
  };  
  
  export const login = async (req, res) => {
    try {
      const { username, password } = req.body;
      const hashedPassword = crypto.createHash('md5').update(password).digest('hex');
      const user = await db('account').where({ username, password: hashedPassword }).first();
  
      if (!user) return res.status(401).json({ message: 'Invalid credentials' });
  
      const token = jwt.sign({ userID: user.userID }, JWT_SECRET, { expiresIn: '1h' });
      res.json({ token, userID: user.userID });
    } catch (err) {
      console.error('Login Error:', err);
      res.status(500).json({ error: err.message });
    }
  };  