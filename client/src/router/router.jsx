import { createBrowserRouter, RouterProvider } from "react-router-dom";
import PrivateRoute from "../components/PrivateRoute";
import LandingPage from "../views/pages/LandingPage";  // Adjust path based on file structure
import ExercisePage from "../views/pages/ExercisePage";
import FoodDrinkPage from "../views/pages/FoodDrinkPage";
import GoalsPage from "../views/pages/GoalsPage";
import GroupsPage from "../views/pages/GroupsPage";
import LoginPage from "../views/pages/LoginPage";
import RegisterPage from "../views/pages/RegisterPage";
import DashboardPage from "../views/pages/DashboardPage";
import ProfilePage from "../views/pages/ProfilePage";


//Includes the protected routes, the user will only have access to some pages when signed in
//Commented out protected routes as we are still completing frontend 
//Once frontend is finished - uncomment out commented code
export const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
},
{
    path: "/register",
    element: <RegisterPage />,
    
},
{
    path: "/exercise",
    /*
    element: (
        <PrivateRoute>
            <ExercisePage />,
        </PrivateRoute>
    ),
    */
    element: <ExercisePage />,
},
{
    path: "/fooddrink",
    /*
    element: (
        <PrivateRoute>
            <FoodDrinkPage />,
        </PrivateRoute>
    ),
    */
    element: <FoodDrinkPage />,
},
{
    path: "/goals",
    /*
    element: (
        <PrivateRoute>
            <GoalsPage />,
        </PrivateRoute>
    ),
    */
    element: <GoalsPage />
},
{
    path: "/groups",
    /*
    element: (
        <PrivateRoute>
            <GroupsPage />,
        </PrivateRoute>
    ),
    */
   element: <GroupsPage />
},
{
    path: "/dashboard",
    /*
    element: (
        <PrivateRoute>
            <DashboardPage />,
        </PrivateRoute>
    ),
    */
   element: <DashboardPage />
},
{
    path: "/profile",
    /*
    element: (
        <PrivateRoute>
            <ProfilePage />,
        </PrivateRoute>
    ),
    */
   element: <ProfilePage />
},
]);
