/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

exports.up = function (knex) {
    return knex.schema.createTable("users", (table) => {
        table.increments("userID").primary(); // Auto-increment primary key
        table.string("realname", 50).notNullable();
        table.float("height").notNullable();
        table.float("weight").notNullable();
        table.boolean("weightCaptureOn").defaultTo(false);
        table.date("dob").notNullable();
        table.enu("gender", ["male", "female", "other", "prefer-not-to-say"]).notNullable();
        table.float("BMI"); // Optional field
        table.float("goalWeight"); // Optional goal weight
        table.timestamps(true, true);
      });
  };  
  

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTable("users");
}

  