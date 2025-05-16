// Update with your config settings.
// These are my db info but you would have to change it to yours

import dotenv from "dotenv";

dotenv.config();

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
const development = {
  client: 'postgresql',
  connection: {
    database: "swehealthtracker",
    user: "postgres",
    password: "letmein"
  },
  pool: {
    min: 2,
    max: 10
  },
  migrations: {
    tableName: 'knex_migrations'
  },
  seeds: {
    directory: "seeds"
  }
};

const production = {
  client: 'postgresql',
  connection: {
    database: 'my_db',
    user:     'username',
    password: 'password'
  },
  pool: {
    min: 2,
    max: 10
  },
  migrations: {
    tableName: 'knex_migrations'
  },
  seeds: {
    directory: "db/seeds"
  }
}

export { development, production };
