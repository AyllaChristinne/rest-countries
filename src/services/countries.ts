import axios from "axios";
import { CustomResponseType } from "../types";

const API_URL = "https://restcountries.com/v3.1";

export async function getAllCountries(): Promise<CustomResponseType> {
  return await axios(
    `${API_URL}/all?fields=name,population,flags,region,capital`
  )
    .then((response) => {
      return { success: true as const, data: response.data };
    })
    .catch((err) => {
      console.error("GET All Countries Error: ", err);
      return { success: false as const, error: err.message };
    });
}

export async function getCountriesByRegion(
  region: string
): Promise<CustomResponseType> {
  return await axios(`${API_URL}/region/${region}`)
    .then((response) => {
      return { success: true as const, data: response.data };
    })
    .catch((err) => {
      console.error("GET Countries By Region Error: ", err);
      return { success: false as const, error: err.message };
    });
}

export async function getCountryByFullName(
  name: string
): Promise<CustomResponseType> {
  return await axios(`${API_URL}/name/${name}?fullText=true`)
    .then((response) => {
      return { success: true as const, data: response.data };
    })
    .catch((err) => {
      console.error("GET Country Error: ", err.response.data);
      return { success: false as const, error: err.message };
    });
}

export async function getCountryByName(
  name: string
): Promise<CustomResponseType> {
  return await axios(`${API_URL}/name/${name}`)
    .then((response) => {
      return { success: true as const, data: response.data };
    })
    .catch((err) => {
      console.error("GET Country Error: ", err.response.data);
      return { success: false as const, error: err.message };
    });
}

export async function getBorders(borders: string[]) {
  return await axios(`${API_URL}/alpha?codes=${borders.toString()}`)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      console.error("GET Border Countries Error: ", err);
      return err;
    });
}
