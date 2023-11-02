import { resetPageNumbers } from "../resetPageNumbers";
import { mockCountry } from "../../mocks/country";

describe("Function resetPageNumbers", () => {
  it("should set empty page numbers when countries are null", () => {
    const setPageNumbersMock = jest.fn();
    resetPageNumbers(null!, setPageNumbersMock);
    expect(setPageNumbersMock).toHaveBeenCalledWith([]);
  });

  it("should set page numbers correctly for multiple pages", () => {
    const countries = Array.from({ length: 40 }, (_) => mockCountry);

    const setPageNumbersMock = jest.fn();
    resetPageNumbers(countries, setPageNumbersMock);
    expect(setPageNumbersMock).toHaveBeenCalledWith([1, 2]);
  });

  it("should set page numbers correctly for fewer items than a single page", () => {
    const countries = Array.from({ length: 3 }, (_) => mockCountry);

    const setPageNumbersMock = jest.fn();
    resetPageNumbers(countries, setPageNumbersMock);
    expect(setPageNumbersMock).toHaveBeenCalledWith([1]);
  });

  it("should set empty page numbers when countries are empty array", () => {
    const setPageNumbersMock = jest.fn();
    resetPageNumbers([], setPageNumbersMock);
    expect(setPageNumbersMock).toHaveBeenCalledWith([]);
  });
});
