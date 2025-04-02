/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable("exercise", (table) => {
        table.increments("exerciseID");
        table.integer("userID").unsigned().references("userID").inTable("users");
        table.enu("exerciseType", ["walking", "cycling", "swimming", "running", "pilates", "climbing"]).notNullable();
        table.integer("duration").notNullable(); // Minutes
        table.float("distance"); // Optional
        table.float("caloriesBurned").notNullable();
        table.date("entryDate").notNullable();
      });    
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable("exercise");
};
