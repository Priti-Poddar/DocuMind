import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "highlight.js/styles/github-dark.css";
import { Toaster } from "react-hot-toast";


import App from "./App";
import "./index.css";
import AppProvider from "./context/AppProvider";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AppProvider>
      <React.StrictMode>
        <App />

        <Toaster
          position="top-right"
          reverseOrder={false}
          toastOptions={{
            duration: 2500,
            style: {
              background: "#27272a",
              color: "#fff",
              border: "1px solid #3f3f46",
            },
          }}
        />
      </React.StrictMode>
    </AppProvider>
  </BrowserRouter>,
);