import db from '../db/db.js';

export const logWeight = async (req, res) => {
  const userID  = req.userID;
  const { weight, date } = req.body;
  
  if (!weight) return res.status(400).json({ message: "Weight is required" });
  const parsedWeight = parseFloat(weight);

  if (isNaN(parsedWeight)) {
    return res.status(400).json({ message: "Weight must be a valid number" });
  }

  if (parsedWeight < 20 || parsedWeight > 635) {
    return res.status(400).json({ message: "Weight must be between 20kg and 635kg" });
  }

  const logDate = date ? new Date(date) : new Date();
  if (isNaN(logDate.getTime())) {
    return res.status(400).json({ message: "Invalid date" });
  }

  const currentDate = new Date();
  if (logDate > currentDate) {
    return res.status(400).json({ message: "Cannot log weight for a future date" });
  }  

  try {
    await db('weight').insert({
      userID,
      weight,
      date: logDate,
    });
    const normalizeDate = (d) => new Date(d.getFullYear(), d.getMonth(), d.getDate());
    const isToday = normalizeDate(logDate).getTime() === normalizeDate(currentDate).getTime();
    if (isToday) {
      await db('users').where({ userID }).update({ weight: parsedWeight });
    }
    res.status(201).json({ message: "Weight logged successfully" });
  } catch (err) {
    console.error("Log Weight Error:", err);
    res.status(500).json({ error: "Failed to log weight" });
  }
};


export const getWeightHistory = async (req, res) => {
  const  userID  = req.userID;

  try {
    const logs = await db('weight')
      .where({ userID })
      .orderBy('date', 'desc');
    res.json(logs);
  } catch (err) {
    console.error("Get Weight History Error:", err);
    res.status(500).json({ error: "Failed to fetch weight history" });
  }
};


export const deleteWeightLog = async (req, res) => {
    const { weightID } = req.params;
    if (!weightID) {
      return res.status(400).json({ message: "Log ID is required" });
    }
    try { 
      const deleted = await db('weight').where({weightID}).del();
      if (deleted === 0) {
        return res.status(404).json({ message: "Weight log not found" });
      }
      res.status(200).json({ message: "Weight log deleted successfully" });
    } catch (err) {
      console.error("Error deleting weight log:", err);
      res.status(500).json({ error: "Failed to delete weight log" });
    }
  };
  
  

  