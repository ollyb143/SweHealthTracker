import React from "react";
import { RouterProvider } from 'react-router-dom';
import './index.css'; 
import './landing.css';
import { router } from "./router/router";


function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;

