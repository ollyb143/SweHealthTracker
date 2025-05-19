/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

// migrations/20250516_create_weights_table.js

exports.up = function (knex) {
    return knex.schema.createTable("weight", (table) => {
        table.increments("weightID");                                    
        table.integer("userID").unsigned().notNullable().references("userID").inTable("users").onDelete("CASCADE");                                          // FOREIGN KEY → users.userID
        table.float("weight").notNullable();                           
        table.timestamp("date", { useTz: true }).defaultTo(knex.fn.now());                                     // TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTable("weight");
};

