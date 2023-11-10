import axios from "axios";
import { API_URL, CustomResponseType } from "./types";

export async function getCountryByName(
  name: string
): Promise<CustomResponseType> {
  return await axios(
    `${API_URL}/name/${name}?fields=name,population,flags,region,capital`
  )
    .then((response) => {
      return { success: true as const, data: response.data };
    })
    .catch((err) => {
      console.error("GET Country Error: ", err.response.data);
      return { success: false as const, error: err.message };
    });
}
