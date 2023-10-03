/* eslint-disable @typescript-eslint/no-empty-function */
import React, { createContext, useContext, useEffect, useState } from "react";
import { CountryType } from "../types";

interface IProps {
  children: React.ReactNode;
}

interface AppContextType {
  isError: boolean;
  setIsError: (errorMessage: boolean) => void;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
  theme: "light" | "dark";
  setTheme: (theme: "light" | "dark") => void;
  countries: Array<CountryType> | null;
  setCountries: (data: Array<CountryType> | null) => void;
  debouncedSearch: string;
  setDebouncedSearch: (search: string) => void;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  pageNumbers: Array<number>;
  setPageNumbers: (pages: number[]) => void;
  currentCountries: Array<CountryType> | null;
  setCurrentCountries: (data: Array<CountryType> | null) => void;
  filteredCountries: Array<CountryType> | null;
  setFilteredCountries: (data: Array<CountryType> | null) => void;
}

const initialContext: AppContextType = {
  isError: false,
  setIsError: () => {},
  isLoading: false,
  setIsLoading: () => {},
  theme: "light",
  setTheme: () => {},
  countries: null,
  setCountries: () => {},
  debouncedSearch: "",
  setDebouncedSearch: () => {},
  currentPage: 1,
  setCurrentPage: () => {},
  pageNumbers: [],
  setPageNumbers: () => {},
  currentCountries: null,
  setCurrentCountries: () => {},
  filteredCountries: null,
  setFilteredCountries: () => {},
};

const AppContext = createContext<AppContextType>(initialContext);

export const AppProvider = ({ children }: IProps) => {
  const [isError, setIsError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [countries, setCountries] = useState<Array<CountryType> | null>(null);
  const [debouncedSearch, setDebouncedSearch] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageNumbers, setPageNumbers] = useState<Array<number>>([]);
  const [currentCountries, setCurrentCountries] =
    useState<Array<CountryType> | null>(null);
  const [filteredCountries, setFilteredCountries] =
    useState<Array<CountryType> | null>(null);

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
    <AppContext.Provider
      value={{
        isError,
        setIsError,
        isLoading,
        setIsLoading,
        theme,
        setTheme,
        countries,
        setCountries,
        debouncedSearch,
        setDebouncedSearch,
        currentPage,
        setCurrentPage,
        pageNumbers,
        setPageNumbers,
        currentCountries,
        setCurrentCountries,
        filteredCountries,
        setFilteredCountries,
      }}
    >
      <div data-theme={theme}>{children}</div>
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};
