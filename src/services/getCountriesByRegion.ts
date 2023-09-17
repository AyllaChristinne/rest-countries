import axios from "axios";

export async function getCountriesByRegion(region: string) {
  return await axios(`https://restcountries.com/v2/region/${region}`)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      console.error("GET Countries By Region Error: ", err);
      return err;
    });
}
