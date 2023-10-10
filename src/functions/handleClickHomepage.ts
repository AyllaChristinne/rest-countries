import { CountryType } from "../types";
import { resetPageNumbers } from "./resetPageNumbers";
import { setCountriesByPage } from "./setCountriesByPage";

export function handleClickHomepage(
  setIsError: (error: boolean) => void,
  setCurrentPage: (page: number) => void,
  setFilteredCountries: (data: CountryType[] | null) => void,
  setPageNumbers: (pages: number[]) => void,
  currentPage: number,
  setCurrentCountries: (data: CountryType[] | null) => void,
  countries: CountryType[] | null
) {
  setIsError(false);
  setCurrentPage(1);
  setFilteredCountries(null);
  countries && resetPageNumbers(countries, setPageNumbers);
  countries &&
    setCountriesByPage("", countries, currentPage, setCurrentCountries);
}
