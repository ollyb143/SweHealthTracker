import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import { Provider, useDispatch } from "react-redux";
import { RouterProvider } from "react-router-dom";

import store from "./store/store.js";
import { router } from "./router/router.jsx";
import { loginUser } from "./store/appUserSlice";
import "./index.css";

// Initializes Redux state from localStorage on app load
function AppInitializer() {
  const dispatch = useDispatch();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("appUser"));
    if (storedUser?.token) {
      dispatch(loginUser(storedUser));
    }
  }, [dispatch]);

  return null;
}

// The main App component
const App = () => {
  return (
    <Provider store={store}>
      <AppInitializer />
      <RouterProvider router={router} />
    </Provider>
  );
};

export default App;
