import { CountryType } from "../types";

const COUNTRIES_PER_PAGE = 20;

export const resetPageNumbers = (
  countries: Array<CountryType>,
  setPageNumbers: (pages: number[]) => void
) => {
  const pages = [];
  if (countries) {
    for (
      let i = 1;
      i <= Math.ceil(countries.length / COUNTRIES_PER_PAGE);
      i++
    ) {
      pages.push(i);
    }
  }

  setPageNumbers(pages);
};
