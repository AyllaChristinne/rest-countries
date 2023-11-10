import axios from "axios";
import { API_URL, CustomResponseType } from "./types";

export async function getAllCountries(): Promise<CustomResponseType> {
  return await axios
    .get(`${API_URL}/all?fields=name,population,flags,region,capital`)
    .then((response) => {
      return { success: true as const, data: response.data };
    })
    .catch((err) => {
      console.error("GET All Countries Error: ", err);
      return { success: false as const, error: err.message };
    });
}
