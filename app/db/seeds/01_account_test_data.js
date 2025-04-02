/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex("account").del()
  await knex("account").insert([
    { userID: 1, username: "johnd", password: "securepass1", email: "johnd@example.com" },
    { userID: 2, username: "janes", password: "securepass2", email: "janes@example.com" }
]);

};
