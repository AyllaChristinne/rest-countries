import { LanguagesType } from "../types";

export const formatLanguages = (languages: Array<LanguagesType>) => {
  let formattedLanguages = "";
  const languagesArray = Object.values(languages);

  languagesArray.forEach((lang, index) => {
    formattedLanguages += lang;

    if (index < languagesArray.length - 1) {
      formattedLanguages += ", ";
    }
  });

  return formattedLanguages;
};
