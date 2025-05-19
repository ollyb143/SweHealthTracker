import React from "react";
import { Provider } from "react-redux";  
import store from "../store/store.js"; 
import { RouterProvider } from "react-router-dom"; 
import { router } from "./router/router.jsx"; 
import "./index.css";  

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <Provider store={store}>
      {/* 2) render one ToastContainer at the root */}
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <RouterProvider router={router} />
    </Provider>
  );
};


export default App;
