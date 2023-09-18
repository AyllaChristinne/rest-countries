import axios from "axios";
import { CustomResponseType } from "../types";

export async function getCountriesByRegion(
  region: string
): Promise<CustomResponseType> {
  return await axios(`https://restcountries.com/v2/region/${region}`)
    .then((response) => {
      return { success: true as const, data: response.data };
    })
    .catch((err) => {
      console.error("GET Countries By Region Error: ", err);
      return { success: false as const, error: err.message };
    });
}
