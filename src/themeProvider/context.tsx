import React, { Dispatch, SetStateAction } from "react";

type initialThemeProps = {
  theme: "light" | "dark";
  setTheme: Dispatch<SetStateAction<"light" | "dark">>;
};

export const initialThemeState: initialThemeProps = {
  theme: "light",
  setTheme: () => null,
};

export const ThemeContext = React.createContext(initialThemeState);
