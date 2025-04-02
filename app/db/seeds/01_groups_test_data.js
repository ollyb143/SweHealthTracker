/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex("groups").del()
  await knex("groups").insert([
    { groupName: "Fitness Enthusiasts", adminUserID: 1 },
    { groupName: "Healthy Eaters", adminUserID: 2 }
]);

};
