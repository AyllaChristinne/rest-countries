import axios from "axios";
import { API_URL } from "./types";

export async function getBorders(borders: string[]) {
  return await axios(`${API_URL}/alpha?codes=${borders.toString()}&fields=name`)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      console.error("GET Border Countries Error: ", err);
      return err;
    });
}
