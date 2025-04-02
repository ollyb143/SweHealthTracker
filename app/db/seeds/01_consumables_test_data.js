/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('consumables').del()
  await knex("consumables").insert([
    { consumableName: "Apple", consumableCalories: 95 },
    { consumableName: "Banana", consumableCalories: 105 }
]);

};
