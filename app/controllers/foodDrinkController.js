import db from '../db/db.js';

export const getConsumables = async (req, res) => {
  const userID = req.userID;
  const date = req.query.date || new Date().toISOString().slice(0, 10);
  try {
    const consumables = await db('consumables')
      .where({ userID })
      .andWhereRaw('DATE("mealDate") = ?', [date])
      .orderBy('mealDate', 'asc');

    res.status(200).json(consumables);
  } catch (err) {
    console.error("Get Consumables Error:", err);
    res.status(500).json({ error: err.message });
  }
};


export const createConsumable = async (req, res) => {
  const userID = req.userID;
  const { consumableName, consumableCalories, mealType, mealDate } = req.body;
  if (!consumableName || isNaN(consumableCalories) || !mealType || !mealDate) {
    return res.status(400).json({ error: "Invalid input" });
  }
  try {
    const [item] = await db('consumables')
      .insert({ userID, consumableName, consumableCalories, mealType, mealDate })
      .returning('*');
    res.status(201).json(item);
  } catch (err) {
    console.error("Create Consumable Error:", err);
    res.status(500).json({ error: err.message });
  }
};


export const updateConsumable = async (req, res) => {
  const userID = req.userID;
  const { id } = req.params;
  const { consumableName, consumableCalories, mealType, mealDate } = req.body;
  if (!consumableName || isNaN(consumableCalories) || !mealType || !mealDate) {
    return res.status(400).json({ error: "Invalid input" });
  }
  try {
    const [updated] = await db('consumables')
      .where({ consumableID: id, userID })
      .update({ consumableName, consumableCalories, mealType, mealDate })
      .returning('*');
    if (!updated) return res.status(404).json({ error: "Item not found" });
    res.status(200).json(updated);
  } catch (err) {
    console.error("Update Consumable Error:", err);
    res.status(500).json({ error: err.message });
  }
};


export const deleteConsumable = async (req, res) => {
  const userID = req.userID;
  const { id } = req.params;
  try {
    const deleted = await db('consumables')
      .where({ consumableID: id, userID })
      .del();
    if (!deleted) return res.status(404).json({ error: "Item not found." });
    res.status(200).json({ message: "Item deleted." });
  } catch (err) {
    console.error("Delete Consumable Error:", err);
    res.status(500).json({ error: err.message });
  }
};
