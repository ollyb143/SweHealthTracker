/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable("consumables", (table) => {
        table.increments("consumableID");
        table.string("consumableName").notNullable();
        table.float("consumableCalories").notNullable();
      });    
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable("consumables");
};
