import jwt from "jsonwebtoken";
import db from "../db/db.js";
import crypto from "crypto";
import dotenv from "dotenv";

dotenv.config();

// Hashing password using cryto module
const hashPassword = (password) => {
  return crypto.createHash("md5").update(password).digest("hex");
};

// Signing up a new user
const registerUser = async (req, res) => {
  const { realname, username, email, password, dob, gender, height, weight, goalWeight } = req.body;

  try {
    // Checks if username or email already exists
    const existingUser = await db("account").where("username", username).orWhere("email", email).first();
    if (existingUser) {
      return res.status(400).json({ error: "Username or email already taken" });
    }

    // Hashes the password 
    const hashedPassword = hashPassword(password);

    // Insert user data into the 'users' table
    const [newUser] = await db("users").insert({
      realname,
      dob,
      gender,
      height,
      weight,
      goalWeight,
    }).returning("*");

    // Insert account data into the 'account' table
    await db("account").insert({
      userID: newUser.userID,
      username,
      email,
      password: hashedPassword,  // Saves the hashed password
    });

    return res.status(201).json({
      message: "User registered successfully",
      user: newUser,
    });
  } catch (error) {
    console.error("Error during registration", error);
    return res.status(500).json({ error: "Something went wrong during registration" });
  }
};

// Login user
const loginUser = async (req, res) => {
    console.log("Received login request:", req.body);
    console.log("Testing hashed password:", hashPassword("hello"));
  
    const { username, password } = req.body;
  
    if (!username || !password) {
      return res.status(400).json({ error: "Username and password are required" });
    }
  
    try {
      const userAccount = await db("account").where("username", username).first();
      console.log("User found in database:", userAccount);
  
      if (!userAccount) {
        return res.status(400).json({ error: "Invalid username or password" });
      }
  
      const hashedPassword = hashPassword(password);
      console.log("Hashed password:", hashedPassword);
      console.log("Stored password:", userAccount.password);
  
      if (userAccount.password !== hashedPassword) {
        return res.status(400).json({ error: "Invalid username or password" });
      }
  
      const token = jwt.sign(
        { userID: userAccount.userID, username: userAccount.username },
        process.env.JWT_SECRET_KEY,
        { expiresIn: "1h" }
      );
  
      return res.status(200).json({
        message: "Login successful",
        user: {
          userID: userAccount.userID,
          username: userAccount.username,
          email: userAccount.email,
        },
        token,
      });
    } catch (error) {
      console.error("Error during login:", error);
      return res.status(500).json({ error: "Something went wrong during login" });
    }
  };
  

export { registerUser, loginUser };
