import axios from "axios";
import { API_URL, CustomResponseType } from "./types";

export async function getCountriesByRegion(
  region: string
): Promise<CustomResponseType> {
  return await axios
    .get(
      `${API_URL}/region/${region}?fields=name,population,flags,region,capital`
    )
    .then((response) => {
      return { success: true as const, data: response.data };
    })
    .catch((err) => {
      console.error("GET Countries By Region Error: ", err);
      return { success: false as const, error: err.message };
    });
}
