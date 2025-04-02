// Update with your config settings.
// These are my db info but you would have to change it to yours

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
    development: {
      client: 'postgresql',
      connection: {
        database: 'swehealthtrack', //Change this to the name of your db
        user: 'postgres', //When you create the db it should have user set as postgres
        password: 'Password', //Change this to ur postgresql password
      },
    },
  
    staging: {
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
    },
  
    production: {
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
      }
    }
  
  };
  