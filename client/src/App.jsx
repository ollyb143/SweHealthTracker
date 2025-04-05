import React from "react";
import ReactDOM from "react-dom/client"; 
import { Provider } from "react-redux";  
import store from "./store/store.js";  
import { RouterProvider } from "react-router-dom";  
import { router } from "./router/router.jsx";  
import "./index.css";  

const App = () => {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
};


export default App;
