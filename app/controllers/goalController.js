// /app/controllers/goalController.js
import db from '../db/db.js';

export const getGoals = async (req, res) => {
  try {
    const goals = await db('goals').where({userID: req.user.userID});
    res.json(goals);
  } catch (err) {
    console.error('Get Groups Error:', err);
    res.status(500).json({ error: err.message });
  }
};

export const createGoal = async (req, res) => {
  const { userID } = req.user;
  const {
    goalName,
    goalType,
    targetType,
    targetValue,
    deadline,
    groupID
  } = req.body;

  try {
    await db('goals').insert({ 
      userID: userID,
      groupID: groupID,
      goalName: goalName,
      goalType: goalType,
      goalDescription: targetType,
      targetValue: targetValue,
      currentValue: 0,
      currentStatus: "In Progress",
      goalCompleted: false,
      deadline: deadline
    })
    res.status(200).json({ message: 'Goal Created' });
  } catch (err) {
    console.error('Create Goal Error:', err);
    res.status(500).json({ error: err.message });
  }
};

export const deleteGoal = async (req, res) => {

}