/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex("memberships").del()
  await knex("memberships").insert([
    { groupID: 1, userID: 1, joinDate: new Date() },
    { groupID: 2, userID: 2, joinDate: new Date() }
]);

};
