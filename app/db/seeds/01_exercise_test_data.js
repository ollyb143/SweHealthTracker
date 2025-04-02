/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('exercise').del()
  await knex("exercise").insert([
    { userID: 1, exerciseType: "running", duration: 30, distance: 5.0, caloriesBurned: 300, entryDate: new Date() },
    { userID: 2, exerciseType: "walking", duration: 45, distance: 10.0, caloriesBurned: 400, entryDate: new Date() }
]);

};
