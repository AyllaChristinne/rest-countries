import axios from "axios";
import { CustomResponseType } from "../types";

export async function getCountryByName(
  name: string
): Promise<CustomResponseType> {
  console.log("====>", name);
  return await axios(`https://restcountries.com/v2/name/${name}`)
    .then((response) => {
      return { success: true as const, data: response.data };
    })
    .catch((err) => {
      console.error("GET Country Error: ", err.response.data);
      return { success: false as const, error: err.message };
    });
}
