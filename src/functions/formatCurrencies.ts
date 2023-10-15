import { CurrenciesType } from "../types";

export const formatCurrencies = (currencies: Array<CurrenciesType>) => {
  let formattedCur = "";

  currencies.forEach((currency, index) => {
    formattedCur += currency.name;

    if (index < currencies.length - 1) {
      formattedCur += ", ";
    }
  });

  return formattedCur;
};
