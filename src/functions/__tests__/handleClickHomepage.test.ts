import { handleClickHomepage } from "../handleClickHomepage";
import { mockCountry } from "../../mocks/country";

describe("Function handleClickHomepage", () => {
  it("should reset states page numbers, error, current page and current countries", () => {
    const setIsError = jest.fn();
    const setCurrentPage = jest.fn();
    const setFilteredCountries = jest.fn();
    const setPageNumbers = jest.fn();
    const setCurrentCountries = jest.fn();
    const currentPage = 2;
    const countries = [mockCountry];

    handleClickHomepage(
      setIsError,
      setCurrentPage,
      setFilteredCountries,
      setPageNumbers,
      currentPage,
      setCurrentCountries,
      countries
    );

    expect(setIsError).toHaveBeenCalledWith(false);
    expect(setCurrentPage).toHaveBeenCalledWith(1);
    expect(setFilteredCountries).toHaveBeenCalledWith(null);
  });
});
