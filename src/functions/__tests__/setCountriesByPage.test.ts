import { CountryType } from "../../types";
import { setCountriesByPage } from "../setCountriesByPage";
import { mockCountry } from "../../mocks/countries";

describe("Function setCountriesByPage", () => {
  const mockCountries: CountryType[] = Array.from(
    { length: 40 },
    (_) => mockCountry
  );

  it("should set countries correctly for the first page", () => {
    const setCurrentCountriesMock = jest.fn();
    const currentPage = 1;
    setCountriesByPage(mockCountries, currentPage, setCurrentCountriesMock);
    expect(setCurrentCountriesMock).toHaveBeenCalledWith(
      mockCountries.slice(0, 20)
    );
  });

  it("should set countries correctly for a non-first page", () => {
    const setCurrentCountriesMock = jest.fn();
    const currentPage = 2;
    setCountriesByPage(mockCountries, currentPage, setCurrentCountriesMock);
    expect(setCurrentCountriesMock).toHaveBeenCalledWith(
      mockCountries.slice(20, 40)
    );
  });

  it("should set empty countries for currentPage beyond total number of pages", () => {
    const setCurrentCountriesMock = jest.fn();
    const currentPage = 3;
    setCountriesByPage(mockCountries, currentPage, setCurrentCountriesMock);
    expect(setCurrentCountriesMock).toHaveBeenCalledWith([]);
  });

  it("should set empty countries when input countries array is empty", () => {
    const setCurrentCountriesMock = jest.fn();
    const currentPage = 1;
    setCountriesByPage([], currentPage, setCurrentCountriesMock);
    expect(setCurrentCountriesMock).toHaveBeenCalledWith([]);
  });
});
