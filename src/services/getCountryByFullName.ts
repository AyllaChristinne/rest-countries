import axios from "axios";
import { CustomResponseType } from "../types";

export async function getCountryByFullName(
  name: string
): Promise<CustomResponseType> {
  return await axios(`https://restcountries.com/v2/name/${name}?fullText=true`)
    .then((response) => {
      return { success: true as const, data: response.data };
    })
    .catch((err) => {
      console.error("GET Country Error: ", err.response.data);
      return { success: false as const, error: err.message };
    });
}
