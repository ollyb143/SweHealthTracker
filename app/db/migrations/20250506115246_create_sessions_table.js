/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable("sessions", (table) => {
        table.increments("sessionID");
        table.integer("userID").unsigned().references("userID").inTable("users").onDelete("CASCADE");
        table.text("sessionToken").notNullable().unique();
        table.timestamp("createdAt").defaultTo(knex.fn.now());
        table.timestamp("expiresAt");
      });    
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable("sessions");
};
