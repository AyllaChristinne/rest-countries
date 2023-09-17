import axios from "axios";

export async function getAllCountries() {
  return await axios(
    "https://restcountries.com/v2/all?fields=name,population,flag,region,capital"
  )
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      console.error("GET All Countries Error: ", err);
      return err;
    });
}
