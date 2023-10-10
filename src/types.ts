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
  alpha3Code: string;
}

export interface CountryCardProps {
  flag: string;
  name: string;
  pop: number;
  region: string;
  capital: string;
}

export interface CurrenciesType {
  code: string;
  name: string;
  symbol: string;
}

export interface LanguagesType {
  iso639_1: string;
  iso639_2: string;
  name: string;
  nativeName: string;
}

export interface CountryType {
  name: string;
  flag: string;
  nativeName: string;
  population: number;
  region: string;
  subregion: string;
  capital: string;
  topLevelDomain: string;
  currencies: Array<CurrenciesType>;
  languages: Array<LanguagesType>;
  borders: Array<string>;
  alpha3Code: string;
}

export type IconProps = {
  classNames?: string;
};
