import axios from "axios";
import { API_URL, CustomResponseType } from "./types";

export async function getCountryByFullName(
  name: string
): Promise<CustomResponseType> {
  return await axios
    .get(
      `${API_URL}/name/${name}?fullText=true&fields=name,population,flags,region,capital,currencies,languages,subregion,borders,timezones`
    )
    .then((response) => {
      return { success: true as const, data: response.data };
    })
    .catch((err) => {
      console.error("GET Country Error: ", err.response.data);
      return { success: false as const, error: err.message };
    });
}
