import React, { useEffect, useMemo, useState } from "react";
import { ThemeContext, initialThemeState } from "./context";

type ThemeProviderProps = {
  children: React.ReactNode;
};

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [theme, setTheme] = useState(initialThemeState.theme);

  const configTheme = useMemo(() => {
    return { theme, setTheme };
  }, [theme]);

  useEffect(() => {
    const { localStorage } = window;
    const savedThemeLocal = localStorage.getItem("data-theme");

    if (savedThemeLocal === "light" || savedThemeLocal === "dark") {
      setTheme(savedThemeLocal);
    }
  }, []);

  useEffect(() => {
    const { localStorage } = window;
    localStorage.setItem("data-theme", theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={configTheme}>
      <div data-theme={theme}>{children}</div>
    </ThemeContext.Provider>
  );
};
