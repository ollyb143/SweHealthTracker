/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable("diets", (table) => {
        table.increments("dietID");
        table.integer("userID").unsigned().references("userID").inTable("users");
        table.float("mealCalories").notNullable();
        table.enu("mealType", ["breakfast", "lunch", "dinner", "snack"]).notNullable();
        table.timestamp("entryType").defaultTo(knex.fn.now());
      });    
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable("diets");
};
