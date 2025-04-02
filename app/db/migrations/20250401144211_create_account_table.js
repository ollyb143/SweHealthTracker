/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
return knex.schema.createTable("account", (table) => {
    table.increments("accountID");
    table.integer("userID").unsigned().references("userID").inTable("users").onDelete("CASCADE");
    table.string("username", 50).unique().notNullable();
    table.string("password", 50).notNullable();
    table.string("email", 50).unique().notNullable();
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable("account");
};
