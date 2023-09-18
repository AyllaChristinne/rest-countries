import axios from "axios";
import { CustomResponseType } from "../types";

export async function getAllCountries(): Promise<CustomResponseType> {
  return await axios(
    "https://restcountries.com/v2/all?fields=name,population,flag,region,capital"
  )
    .then((response) => {
      return { success: true as const, data: response.data };
    })
    .catch((err) => {
      console.error("GET All Countries Error: ", err);
      return { success: false as const, error: err.message };
    });
}
