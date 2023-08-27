import { LanguagesType } from "../types";

export const getLanguages = (languages: Array<LanguagesType>) => {
  let formattedLang = "";

  languages.map((language) => {
    return (formattedLang += language.name + ",");
  });

  return formattedLang.substring(0, formattedLang.length - 1);
};
