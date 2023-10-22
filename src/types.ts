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
