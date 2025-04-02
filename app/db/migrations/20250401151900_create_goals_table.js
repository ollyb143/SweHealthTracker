/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable("goals", (table) => {
        table.increments("goalID");
        table.integer("userID").unsigned().references("userID").inTable("users");
        table.integer("groupID").unsigned().nullable().references("groupID").inTable("groups");
        table.string("goalName").notNullable();
        table.string("goalType").notNullable();
        table.string("goalDescription");
        table.float("targetValue").notNullable();
        table.float("currentValue").defaultTo(0);
        table.string("currentStatus").defaultTo("in-progress");
        table.boolean("goalCompleted").defaultTo(false);
        table.timestamp("createdAt").defaultTo(knex.fn.now());
        table.timestamp("deadline").nullable();
      });
    
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable("goals");
};
