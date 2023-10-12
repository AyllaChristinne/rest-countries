import { CountryType } from "../types";

const COUNTRIES_PER_PAGE = 20;

export const setCountriesByPage = (
  countries: Array<CountryType>,
  currentPage: number,
  setCurrentCountries: (data: CountryType[] | null) => void
) => {
  const indexOfLastPost = currentPage * COUNTRIES_PER_PAGE;
  const indexOfFirstPost = indexOfLastPost - COUNTRIES_PER_PAGE;

  setCurrentCountries(countries.slice(indexOfFirstPost, indexOfLastPost));
};
