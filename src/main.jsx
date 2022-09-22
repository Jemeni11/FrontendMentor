import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

import ThemeContextProvider from "./store/theme-context";
import TodoContextProvider from "./store/todo-context";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeContextProvider>
      <TodoContextProvider>
        <App />
      </TodoContextProvider>
    </ThemeContextProvider>
  </React.StrictMode>
);
