export type CustomResponseType =
  | {
      success: true;
      data: Array<CountryType>;
    }
  | {
      success: false;
      error: string;
    };

export interface BorderCountryType {
  name: string;
  cca3: string;
}

export interface CountryCardProps {
  flag: string;
  name: string;
  pop: number;
  region: string;
  capital: Array<string>;
}

export type CurrenciesType = Record<
  string,
  {
    name: string;
  }
>;

export type LanguagesType = Record<string, string>;

export interface CountryType {
  name: {
    common: string;
  };
  flags: {
    svg: string;
  };
  nativeName: string;
  population: number;
  region: string;
  subregion: string;
  capital: Array<string>;
  timezones: Array<string>;
  currencies: CurrenciesType;
  languages: LanguagesType;
  borders: Array<string>;
  cca3: string;
}

export type IconProps = {
  classNames?: string;
};

export interface AppContextType {
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
