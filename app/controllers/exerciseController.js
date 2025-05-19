import db from "../db/db.js";

export const logExercise = async (req, res) => {
  const userID = req.userID;
  const { exerciseType, duration, distance, caloriesBurned, entryDate } = req.body;
  await db("exercise").insert({ userID, exerciseType, duration, distance, caloriesBurned, entryDate });
  res.json({ message: "Exercise logged" });
};

export const getExercises = async (req, res) => {
  const userID = req.userID;
  const ex = await db("exercise").where({ userID }).orderBy("entryDate", "desc");
  res.json(ex);
};

export const deleteExercise = async (req, res) => {
  const userID = req.userID;
  const id = req.params.id;
  await db("exercise").where({ exerciseID: id, userID }).del();
  res.json({ message: "Deleted" });
};

export const getExerciseStats = async (req, res) => {
  const userID = req.userID;
  const stats = await db("exercise")
    .where({ userID })
    .groupBy("entryDate")
    .select("entryDate")
    .count("* as count")
    .orderBy("entryDate", "asc");
  res.json(stats);
};
