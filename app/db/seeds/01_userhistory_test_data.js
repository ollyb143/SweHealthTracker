/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('userhistory').del()
  await knex("userhistory").insert([
    { userID: 1, weightLog: JSON.stringify({ "2025-03-30": 75 }), dietLog: JSON.stringify({ "2025-03-30": [1, 2] }), exerciseLog: JSON.stringify({ "2025-03-30": [1] }) },
    { userID: 2, weightLog: JSON.stringify({ "2025-03-30": 68 }), dietLog: JSON.stringify({ "2025-03-30": [2] }), exerciseLog: JSON.stringify({ "2025-03-30": [2] }) }
]);

};
