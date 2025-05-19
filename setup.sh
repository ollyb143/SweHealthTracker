#!/bin/bash

set -e

cd app || { echo "app folder not found."; exit 1; }

echo "Installing npm packages..."

# Install packages
npm init -y
npm i --save-dev nodemon
npm i express --save
npm i dotenv --save
npm i cors --save
npm i pg --save
npm i knex --save

# Knex migration setup
echo "Running knex init..."
cd db || { echo "db folder not found."; exit 1; }
npx knex init

echo "Please make sure knexfile.js is updated with your DB config before continuing."
read -p "Press Enter to continue after editing knexfile.js..."

# Run migrations
echo "Running migrations..."
npx knex migrate:up 20250401122756_create_users_table.js
npx knex migrate:up 20250401144211_create_account_table.js
npx knex migrate:up 20250401145211_create_groups_table.js
npx knex migrate:up 20250401150202_create_memberships_table.js
npx knex migrate:up 20250401151900_create_goals_table.js
npx knex migrate:up 20250401151924_create_consumables_table.js
npx knex migrate:up 20250401151946_create_diets_table.js
npx knex migrate:up 20250401152008_create_exercise_table.js
npx knex migrate:up 20250401152032_create_userhistory_table.js

#Run seed files
echo "Running seed files..."
npx knex seed:run --specific=01_users_test_data.js
npx knex seed:run --specific=01_account_test_data.js
npx knex seed:run --specific=01_groups_test_data.js
npx knex seed:run --specific=01_memberships_test_data.js
npx knex seed:run --specific=01_goals_test_data.js
npx knex seed:run --specific=01_consumables_test_data.js
npx knex seed:run --specific=01_diets_test_data.js
npx knex seed:run --specific=01_exercise_test_data.js
npx knex seed:run --specific=01_userhistory_test_data.js

echo "Setup complete!"