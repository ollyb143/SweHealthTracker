import db from '../db/db.js';

export const getGoals = async (req, res) => {
  try {
    const goals = await db('goals')
      .where({ userID: req.userID })
      .orderBy('deadline', 'asc');
    res.json(goals);
  } catch (err) {
    console.error('Get Goals Error:', err);
    res.status(500).json({ error: err.message });
  }
};

export const createGoal = async (req, res) => {
  const userID = req.userID;
  const { goalName, goalType, targetType, targetValue, deadline, groupID } = req.body;
  if (!goalName || !goalType || !targetType || !targetValue || !deadline) {
    return res.status(400).json({ error: 'All fields except groupID are required.' });
  }
  try {
    const [goal] = await db('goals')
      .insert({
        userID,
        groupID: groupID || null,
        goalName,
        goalType,
        goalDescription: targetType,
        targetValue,
        currentValue: 0,
        currentStatus: 'In Progress',
        goalCompleted: false,
        deadline,
      })
      .returning('*');
    res.status(201).json(goal);
  } catch (err) {
    console.error('Create Goal Error:', err);
    res.status(500).json({ error: err.message });
  }
};

export const updateGoal = async (req, res) => {
  const userID = req.userID;
  const { id } = req.params;
  const { goalName, goalType, targetType, targetValue, deadline, currentValue, goalCompleted } = req.body;
  try {
    const [updated] = await db('goals')
      .where({ goalID: id, userID })
      .update({
        goalName,
        goalType,
        goalDescription: targetType,
        targetValue,
        currentValue,
        goalCompleted,
        currentStatus: goalCompleted ? 'Completed' : 'In Progress',
        deadline,
      })
      .returning('*');
    if (!updated) {
      return res.status(404).json({ error: 'Goal not found.' });
    }
    res.json(updated);
  } catch (err) {
    console.error('Update Goal Error:', err);
    res.status(500).json({ error: err.message });
  }
};


export const deleteGoal = async (req, res) => {
  const userID = req.userID;
  const { id } = req.params;
  try {
    const deleted = await db('goals')
      .where({ goalID: id, userID })
      .del();
    if (!deleted) {
      return res.status(404).json({ error: 'Goal not found.' });
    }
    res.json({ message: 'Goal deleted.' });
  } catch (err) {
    console.error('Delete Goal Error:', err);
    res.status(500).json({ error: err.message });
  }
};


export const toggleGoalComplete = async (req, res) => {
    const userID = req.userID;
    const { id } = req.params;
    try {
      const goal = await db('goals')
        .where({ goalID: id, userID })
        .first();
      if (!goal) return res.status(404).json({ error: 'Goal not found.' });
      const newStatus = !goal.goalCompleted;
      const [updated] = await db('goals')
        .where({ goalID: id, userID })
        .update({
          goalCompleted: newStatus,
          currentStatus: newStatus ? 'Completed' : 'In Progress',
        })
        .returning('*');
      res.json(updated);
    } catch (err) {
      console.error('Toggle Goal Complete Error:', err);
      res.status(500).json({ error: err.message });
    }
  };
  