import db from '../db/db.js';

export const logWeight = async (req, res) => {
  const { userID } = req.user;
  const { weight } = req.body;

  if (!weight) return res.status(400).json({ message: "Weight is required" });

  try {
    await db('weight').insert({
      userID,
      weight,
      date: new Date()
    });

    await db('users').where({ userID }).update({ weight });


    res.status(201).json({ message: "Weight logged successfully" });
  } catch (err) {
    console.error("Log Weight Error:", err);
    res.status(500).json({ error: "Failed to log weight" });
  }
};

export const getWeightHistory = async (req, res) => {
  const { userID } = req.user;

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
  
  

  