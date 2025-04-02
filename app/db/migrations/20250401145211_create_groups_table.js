/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable("groups", (table) => {
      table.increments("groupID");
      table.string("groupName", 50).notNullable();
      table.integer("adminUserID").unsigned().references("userID").inTable("users");
    });
  };
  

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable("groups");
};
