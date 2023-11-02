import { AppContextType } from "../types";

/* eslint-disable @typescript-eslint/no-empty-function */
export const contextValues: AppContextType = {
  isError: false,
  setIsError: jest.fn(),
  isLoading: false,
  setIsLoading: jest.fn(),
  theme: "light",
  setTheme: jest.fn(),
  countries: null,
  setCountries: jest.fn(),
  debouncedSearch: "",
  setDebouncedSearch: jest.fn(),
  currentPage: 1,
  setCurrentPage: jest.fn(),
  pageNumbers: [],
  setPageNumbers: jest.fn(),
  currentCountries: null,
  setCurrentCountries: jest.fn(),
  filteredCountries: null,
  setFilteredCountries: jest.fn(),
};
