/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */

exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("users").del();

  // Inserts seed entries
  await knex("users").insert([
    { realname: "John Doe", height: 1.75, weight: 75, weightCaptureOn: true, dob: "1990-01-15", gender: "male", BMI: 24.5, goalWeight: 70 },
    { realname: "Jane Smith", height: 1.68, weight: 68, weightCaptureOn: false, dob: "1985-06-22", gender: "female", BMI: 24.1, goalWeight: 65 }
  ]);
};
