import React from "react";
import { createBrowserRouter } from "react-router-dom";

import LandingPage from "../views/pages/LandingPage";
import LoginPage from "../views/pages/LoginPage";
import RegisterPage from "../views/pages/RegisterPage";
import ExercisePage from "../views/pages/ExercisePage";
import FoodDrinkPage from "../views/pages/FoodDrinkPage";
import GoalsPage from "../views/pages/GoalsPage";
import GroupsPage from "../views/pages/GroupsPage";
import DashboardPage from "../views/pages/DashboardPage";
import UserInfoPage from "../views/pages/UserInfoPage";
import ProtectedRoute from "../components/ProtectedRoutes";
import ForgotPasswordPage from "../views/pages/ForgotPasswordPage";
import ResetPasswordPage from "../views/pages/ResetPasswordPage";

export const router = createBrowserRouter([
  { path: "/", element: <LandingPage /> },
  { path: "/login", element: <LoginPage /> },
  { path: "/register", element: <RegisterPage /> },
  { path: "/forgotpassword", element: <ForgotPasswordPage /> },
  {
    element: <ProtectedRoute />,  
    children: [
      { path: "/exercise", element: <ExercisePage /> },
      { path: "/fooddrink", element: <FoodDrinkPage /> },
      { path: "/goals", element: <GoalsPage /> },
      { path: "/groups", element: <GroupsPage /> },
      { path: "/dashboard", element: <DashboardPage /> },
      { path: "/aboutyou", element: <UserInfoPage /> },
    ]
  },
]);
