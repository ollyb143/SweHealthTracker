const db = require("../db/knexfile.js");
const crypto = require("crypto");

const hashPassword = (password, salt) => {
  return crypto.createHash("sha256").update(password + salt).digest("hex");
};

// Create a new user function - adding hashed password 
const createUser = async (userData) => {
  const { realname, height, weight, dob, gender, goalWeight, username, password, email } = userData;
  const salt = crypto.randomBytes(16).toString("hex");
  const hashedPassword = hashPassword(password, salt);

  const [user] = await db("users").insert({ realname, height, weight, dob, gender, goalWeight }).returning("userID");

  await db("account").insert({
    userID: user.userID,
    username,
    password: hashedPassword + ":" + salt,
    email,
  });

  return user;
};

const getUserByUsername = async (username) => {
  return await db("account").where({ username }).first();
};

export { createUser, getUserByUsername, hashPassword };
