import React from "react";
import ReactDOM from "react-dom/client";
import { ThemeProvider } from "./themeProvider/provider";
import App from "./App";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
