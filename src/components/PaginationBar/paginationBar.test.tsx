import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { AppProvider } from "../../context/appContext";
import { mockCountry } from "../../mocks/countries";
import { PaginationBar } from ".";
import { AppContextType } from "../../types";

const mockContextValues: AppContextType = {
  isError: false,
  setIsError: jest.fn(),
  isLoading: false,
  setIsLoading: jest.fn(),
  theme: "light",
  setTheme: jest.fn(),
  countries: Array.from({ length: 40 }, (_) => mockCountry),
  setCountries: jest.fn(),
  debouncedSearch: "",
  setDebouncedSearch: jest.fn(),
  currentPage: 1,
  setCurrentPage: jest.fn(),
  pageNumbers: [1, 2],
  setPageNumbers: jest.fn(),
  currentCountries: null,
  setCurrentCountries: jest.fn(),
  filteredCountries: null,
  setFilteredCountries: jest.fn(),
};

describe("PaginationBar component", () => {
  const setIsFadeOutMock = jest.fn();
  it("should render correctly", () => {
    const { getByTestId } = render(
      <AppProvider>
        <PaginationBar setIsFadeOut={setIsFadeOutMock} scrollToTop={true} />
      </AppProvider>
    );

    expect(getByTestId("pagination_container")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "left arrow" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "right arrow" })
    ).toBeInTheDocument();
  });

  it("should change page when clicking on a number", async () => {
    const { findByText, rerender } = render(
      <AppProvider initialValue={mockContextValues}>
        <PaginationBar setIsFadeOut={setIsFadeOutMock} scrollToTop={true} />
      </AppProvider>
    );
    const numberButton = await findByText("2");

    userEvent.click(numberButton);

    rerender(
      <AppProvider>
        <PaginationBar setIsFadeOut={setIsFadeOutMock} scrollToTop={true} />
      </AppProvider>
    );
    expect(setIsFadeOutMock).toHaveBeenCalledWith(true);
  });

  it("should change page when clicking on an arrow", () => {
    const { getByRole, rerender } = render(
      <AppProvider>
        <PaginationBar setIsFadeOut={setIsFadeOutMock} scrollToTop={true} />
      </AppProvider>
    );
    const rightArrowButton = getByRole("button", { name: "right arrow" });
    userEvent.click(rightArrowButton);

    rerender(
      <AppProvider>
        <PaginationBar setIsFadeOut={setIsFadeOutMock} scrollToTop={true} />
      </AppProvider>
    );
    expect(setIsFadeOutMock).toHaveBeenCalledWith(true);
  });
});
