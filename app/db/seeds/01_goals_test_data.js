/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('goals').del()
  await knex("goals").insert([
    { userID: 1, groupID: 1, goalName: "Lose Weight", goalType: "Weight", goalDescription: "Lose 5kg", targetValue: 70, currentValue: 75, currentStatus: "In Progress", goalCompleted: false, createdAt: new Date(), deadline: new Date() },
    { userID: 2, groupID: 2, goalName: "Eat Healthy", goalType: "Diet", goalDescription: "Eat more greens", targetValue: 0, currentValue: 0, currentStatus: "In Progress", goalCompleted: false, createdAt: new Date(), deadline: new Date() }
]);

};
