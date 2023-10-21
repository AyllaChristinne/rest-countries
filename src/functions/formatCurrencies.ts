import { CurrenciesType } from "../types";

export const formatCurrencies = (currencies: Array<CurrenciesType>) => {
  let formattedCurrencies = "";
  const currenciesArray = Object.values(currencies).map(
    (currency) => currency.name
  );

  currenciesArray.forEach((lang, index) => {
    formattedCurrencies += lang;

    if (index < currenciesArray.length - 1) {
      formattedCurrencies += ", ";
    }
  });

  return formattedCurrencies;
};
