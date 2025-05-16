// 1. BACKEND: Express Controllers and Routes (MVC style)

// /app/controllers/authController.js
import db from '../db/db.js';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import { calculateBMI } from '../utils/bmi.js';
import { sendEmail } from '../utils/sendemail.js'; 


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

  export const forgotPassword = async (req, res) => {
    try {
      const { email } = req.body;
      console.log('[Backend] Email received:', email);
      if (!email) return res.status(400).json({ message: "Email is required" });
  
      const userAccount = await db('account').where({ email }).first();
      console.log('[Backend] User account lookup result:', userAccount);
      if (!userAccount) {
        return res.json({ message: "This email isn't linked with an account." });
      }
  
      const code = Math.floor(100000 + Math.random() * 900000).toString(); 
      const expires = Date.now() + 15 * 60 * 1000; 
      
      await db('account')
        .where({ email })
        .update({ resetCode: code, resetCodeExpires: expires });
      
      await sendEmail({
        to: email,
        subject: 'Your Password Reset Code',
        text: `Your password reset code is: ${code}\n\nThis code will expire in 15 minutes.`,
      });
      
  
      res.json({ message: "A 6 digit reset code has been sent." });
    } catch (err) {
      console.error('Forgot Password Error:', err);
      res.status(500).json({ message: "Server error" });
    }
  };

  export const verifyResetCode = async (req, res) => {
    const { email, code } = req.body;
  
    const account = await db('account').where({ email }).first();
  
    if (!account || account.resetCode !== code || Date.now() > account.resetCodeExpires) {
      return res.status(400).json({ message: "Invalid or expired code" });
    }
  
    res.json({ message: "Code verified" });
  };
  

  export const resetPassword = async (req, res) => {
    const { email, newPassword } = req.body;
  
    if (!email || !newPassword) {
      return res.status(400).json({ message: "All fields are required" });
    }
  
    try {
    
      const hashedPassword = crypto.createHash('md5').update(newPassword).digest('hex');
  
      await db('account')
        .where({ email })
        .update({
          password: hashedPassword,
          resetCode: null,
          resetCodeExpires: null,
        });
  
      res.json({ message: "Password has been reset successfully" });
    } catch (err) {
      console.error('Reset Password Error:', err);
      res.status(500).json({ message: "Server error" });
    }
  };
  