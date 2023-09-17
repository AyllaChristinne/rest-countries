import axios from "axios";

export async function getBorders(borders: string[]) {
  return await axios(
    `https://restcountries.com/v2/alpha?codes=${borders.toString()}`
  )
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      console.error("GET Border Countries Error: ", err);
      return err;
    });
}
