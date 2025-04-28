@echo off
cd app || (echo "app folder not found!" && exit /b)

echo Installing npm packages...
call npm init -y
call npm install --save-dev nodemon
call npm install express --save
call npm install dotenv --save
call npm install cors --save
call npm install pg --save
call npm install knex --save

echo Running knex init...
cd db || (echo "db folder not found." && exit /b)
call npx knex init

echo Please make sure knexfile.js is updated with your DB config before continuing.
pause

echo Running migrations...
call npx knex migrate:up 20250401122756_create_users_table.js
call npx knex migrate:up 20250401144211_create_account_table.js
call npx knex migrate:up 20250401145211_create_groups_table.js
call npx knex migrate:up 20250401150202_create_memberships_table.js
call npx knex migrate:up 20250401151900_create_goals_table.js
call npx knex migrate:up 20250401151924_create_consumables_table.js
call npx knex migrate:up 20250401151946_create_diets_table.js
call npx knex migrate:up 20250401152008_create_exercise_table.js
call npx knex migrate:up 20250401152032_create_userhistory_table.js

echo Running seed files...
call npx knex seed:run --specific=01_users_test_data.js
call npx knex seed:run --specific=01_account_test_data.js
call npx knex seed:run --specific=01_groups_test_data.js
call npx knex seed:run --specific=01_memberships_test_data.js
call npx knex seed:run --specific=01_goals_test_data.js
call npx knex seed:run --specific=01_consumables_test_data.js
call npx knex seed:run --specific=01_diets_test_data.js
call npx knex seed:run --specific=01_exercise_test_data.js
call npx knex seed:run --specific=01_userhistory_test_data.js

echo.
echo Setup complete!
pause
