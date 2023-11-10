import { CountryType } from "../types";

export const API_URL = "https://restcountries.com/v3.1";

export type CustomResponseType =
  | {
      success: true;
      data: Array<CountryType>;
    }
  | {
      success: false;
      error: string;
    };
