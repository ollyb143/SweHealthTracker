/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable("consumables", (table) => {
        table.increments("consumableID");
        table.integer("userID").unsigned().references("userID").inTable("users");
        table.string("consumableName").notNullable();
        table.float("consumableCalories").notNullable();
        table.string("mealType").notNullable().defaultTo("Uncategorized");
        table.timestamp("mealDate").defaultTo(knex.fn.now());
      });    
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable("consumables");
};
