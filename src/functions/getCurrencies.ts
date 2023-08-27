import { CurrenciesType } from "../types";

export const getCurrencies = (currencies: Array<CurrenciesType>) => {
  let formattedCurr = "";

  currencies.map((currency) => {
    return (formattedCurr += currency.name + ", ");
  });

  return formattedCurr.substring(0, formattedCurr.length - 1);
};
