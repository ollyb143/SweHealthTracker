import React from "react";
import { Provider } from "react-redux";  // Redux Provider
import store from "../store/store.js";  // Import your Redux store
import { RouterProvider } from "react-router-dom";  // React Router
import { router } from "./router/router.jsx";  // Your router configuration
import "./index.css";  // Global styles

const App = () => {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
};


export default App;
