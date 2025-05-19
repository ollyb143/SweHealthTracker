import db from "../db/db.js";
import crypto from "crypto";
import { calculateBMI } from "../utils/bmi.js";
import { sendEmail } from "../utils/sendemail.js";

export const register = async (req, res) => {
  try {
    const { realname, height, weight, dob, gender, goalWeight, username, email, password } = req.body;
    const BMI = calculateBMI(weight, height);
    const hashed = crypto.createHash("md5").update(password).digest("hex");

    const [userObj] = await db("users")
      .insert({ realname, height, weight, dob, gender, BMI, goalWeight })
      .returning("userID");
    const userID = userObj.userID || userObj;

    await db("account").insert({ userID, username, email, password: hashed });
    res.status(201).json({ message: "Registered" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

export const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const hashed = crypto.createHash("md5").update(password).digest("hex");
    const user = await db("account").where({ username, password: hashed }).first();
    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    req.userID = user.userID;
    next();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};


export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: "Email is required" });

    const acct = await db("account").where({ email }).first();
    if (!acct) return res.json({ message: "Email not linked to an account." });

    const code = Math.floor(100000 + Math.random() * 900000).toString();
    const expires = Date.now() + 15 * 60 * 1000;

    await db("account")
      .where({ email })
      .update({ resetCode: code, resetCodeExpires: expires });

    await sendEmail({
      to: email,
      subject: "Your Password Reset Code",
      text: `Your code is ${code}. Expires in 15 minutes.`,
    });

    res.json({ message: "Reset code sent." });
  } catch (err) {
    console.error("Forgot Password Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

export const verifyResetCode = async (req, res) => {
  const { email, code } = req.body;
  const acct = await db("account").where({ email }).first();

  if (!acct || acct.resetCode !== code || Date.now() > acct.resetCodeExpires) {
    return res.status(400).json({ message: "Invalid or expired code" });
  }

  res.json({ message: "Code verified" });
};

export const resetPassword = async (req, res) => {
  const { email, newPassword } = req.body;
  if (!email || !newPassword) {
    return res.status(400).json({ message: "All fields required" });
  }

  try {
    const hashed = crypto.createHash("md5").update(newPassword).digest("hex");
    await db("account")
      .where({ email })
      .update({ password: hashed, resetCode: null, resetCodeExpires: null });

    res.json({ message: "Password reset successfully" });
  } catch (err) {
    console.error("Reset Password Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
