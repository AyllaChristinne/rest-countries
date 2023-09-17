import React from "react";
import ReactDOM from "react-dom/client";
import { ThemeProvider } from "./themeProvider/provider";
import App from "./App";
import { ErrorProvider } from "./context/errorContext";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <ErrorProvider>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </ErrorProvider>
  </React.StrictMode>
);
