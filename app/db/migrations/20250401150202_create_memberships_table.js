/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable("memberships", (table) => {
        table.increments("membershipID");
        table.integer("groupID").unsigned().references("groupID").inTable("groups").onDelete("CASCADE");
        table.integer("userID").unsigned().references("userID").inTable("users").onDelete("CASCADE");
        table.timestamp("joinDate").defaultTo(knex.fn.now());
      });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable("memberships");
};
