/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex("diets").del()
  await knex("diets").insert([
    { userID: 1, mealCalories: 500, mealType: "lunch", entryType: new Date() },
    { userID: 2, mealCalories: 600, mealType: "dinner", entryType: new Date() }
]);

};
