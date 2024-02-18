import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { UserContextProvider } from "./context/userContext.jsx";
import { app } from "./firebaseConfig.js";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <UserContextProvider>
      <App />
      <ToastContainer />
    </UserContextProvider>
  </React.StrictMode>
);
