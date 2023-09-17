import { LanguagesType } from "../types";

export const getLanguages = (languages: Array<LanguagesType>) => {
  let formattedLang = "";

  languages.forEach((currency, index) => {
    formattedLang += currency.name;

    if (index < languages.length - 1) {
      formattedLang += ", ";
    }
  });

  return formattedLang;
};
