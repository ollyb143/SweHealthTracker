/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable("userhistory", (table) => {
        table.increments("historyID");
        table.integer("userID").unsigned().references("userID").inTable("users").onDelete("CASCADE");
        table.json("weightLog");
        table.json("dietLog");
        table.json("exerciseLog");
      });    
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable("userhistory");
};
