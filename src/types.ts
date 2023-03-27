export type BorderCountryType = {
  name: string;
  alpha3Code: string;
}
export type CountryCardProps = {
  flag: string;
  name: string;
  pop: number;
  region: string;
  capital: string;
}

export type CurrenciesType = {
  code: string;
  name: string;
  symbol: string;
}

export type LanguagesType = {
  iso639_1: string;
  iso639_2: string;
  name: string;
  nativeName: string;
};

export type CountryType = {
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
}

