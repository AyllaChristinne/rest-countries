import axios from "axios";

export async function getCountryByName(name: string) {
  return await axios(`https://restcountries.com/v2/name/${name}`)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      console.error("GET Country Error: ", err.response.data);
      return err.response.data;
    });
}
