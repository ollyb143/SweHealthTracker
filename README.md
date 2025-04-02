# Health Tracker Application

## Description
A health tracker website application aiming to help inform users of basic health information as well as allowing them to track their diet and fitness regime with goals. Users can also create and join groups to help motivate themselves and friends/family!

### Features

1. **Users can create individual profiles** logging features such as their name, username, email, gender, current height (optional), weight (optional) and goal weight (optional).

2. **Users can log their food and drink**, including name of the food, calories etc. , the user can also look for pre-existing food/drink that they had logged previously. 

3. **Users can log their exercise**, including the duration and/or distance for a specific exercise session.

4. **Users can create goals**, including a goal name, type (for example walking), a target (for example minutes) and a deadline.

5. **Users can create and join groups**, including a group name, goal, description and allowing them to allow others to join through email.


## Installed Packages  
- [Node JS](https://nodejs.org/en) -- JavaScript runtime environment for server-side and networking applications
- [React / Vite](https://vite.dev) -- Fast front-end development framework with modern tooling for React
- [React Router DOM](https://reactrouter.com/en/main) -- Routing library for navigation in React web applications
- [Knex.js](https://knexjs.org) -- Routing library for navigation in React web applications
- [PostgreSQL](https://www.postgresql.org/download/) -- Open-source relational database system

## Steps to Run the Application
1. **Navigate to the client folder**
2. **Install the packages** by running:
   ```sh
   npm install
   ```
3. **Start the application** by running:
   ```sh
   npm run dev
   ```
4. **View the application** in the search engine by going to:
   ```sh
   http://localhost:5173/
   ```
   This will open up the application in your chosen search engine


## To install dependencies - for app folder
1. **Navigate to the app folder**
2. **Install the packages** by running:
   ```sh
   npm init
   ```
   ```sh
   npm i --save-dev nodemon
   ```
   ```sh
   npm i express --save
   ```
   ```sh
   npm i dotenv --save
   ```
   ```sh
   npm i cors --save 
   ```
   ```sh
   npm i pg --save
   ```
   ```sh
   npm i knex --save
   ```
3. **Make sure to change knexfile.js to your specific db info** then in db folder terminal migrate files one by one by doing: 
   ```sh
   npx init
   ```
   ```sh
   npx knex migrate:up 20250401122756_create_users_table.js
   ```
   ```sh
   npx knex migrate:up 20250401144211_create_account_table.js
   ```
   ```sh
   npx knex migrate:up 20250401145211_create_groups_table.js
   ```
   ```sh
   npx knex migrate:up 20250401150202_create_memberships_table.js
   ```
   ```sh
   npx knex migrate:up 20250401151900_create_goals_table.js
   ```
   ```sh
   npx knex migrate:up 20250401151924_create_consumables_table.js
   ```
   ```sh
   npx knex migrate:up 20250401151946_create_diets_table.js
   ```
   ```sh
   npx knex migrate:up 20250401152008_create_exercise_table.js
   ```
   ```sh
   npx knex migrate:up 20250401152032_create_userhistory_table.js
   ```
 
4. **Then the seed files**, in db folder run the seed files one by one by doing: 
   ```sh
   npx knex seed:run --specific=01_users_test_data.js
   ```
   ```sh
   npx knex seed:run --specific=01_account_test_data.js
   ```
   ```sh
   npx knex seed:run --specific=01_groups_test_data.js
   ```
   ```sh
   npx knex seed:run --specific=01_memberships_test_data.js
   ```
   ```sh
   npx knex seed:run --specific=01_goals_test_data.js
   ```
   ```sh
   npx knex seed:run --specific=01_consumables_test_data.js
   ```
   ```sh
   npx knex seed:run --specific=01_diets_test_data.js
   ```
   ```sh
   npx knex seed:run --specific=01_exercise_test_data.js
   ```
   ```sh
   npx knex seed:run --specific=01_userhistory_test_data.js
   ```

**In postgreSQL in your DB, all the tables should be there filled with test data**