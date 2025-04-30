import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LandingPage from "../views/pages/LandingPage";  // Adjust path based on file structure
import ExercisePage from "../views/pages/ExercisePage";
import FoodDrinkPage from "../views/pages/FoodDrinkPage";
import GoalsPage from "../views/pages/GoalsPage";
import GroupsPage from "../views/pages/GroupsPage";
import LoginPage from "../views/pages/LoginPage";
import RegisterPage from "../views/pages/RegisterPage";
import DashboardPage from "../views/pages/DashboardPage";
import UserInfoLayout from "../views/pages/UserInfoLayout";
import AccountPage from "../views/pages/AccountPage";
import ProfilePage from "../views/pages/ProfilePage";

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
    element: <ExercisePage />,
},
{
    path: "/fooddrink",
    element: <FoodDrinkPage />,
},
{
    path: "/goals",
    element: <GoalsPage />,
},
{
    path: "/groups",
    element: <GroupsPage />,
},
{
    path: "/dashboard",
    element: <DashboardPage />,
},
{
    path: "/aboutyou",
    element: <UserInfoLayout />,
    children:[
    
        {
            path: "account",
            element: <AccountPage />
        },

        {
            path: "profile",
            element: <ProfilePage />
        }

      
    ]
},
]);
