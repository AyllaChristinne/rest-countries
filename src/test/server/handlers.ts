import { rest } from "msw";
import { mockBorders, mockCountries } from "../../mocks/countries";
import {
  mockCountriesOceania,
  mockCountryByFullName,
  mockCountryByName,
} from "../../mocks/countries";
import { API_URL } from "../../services/types";

export const handlers = [
  rest.get(`${API_URL}/all`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(mockCountries.data));
  }),

  rest.get(`${API_URL}/alpha`, (req, res, ctx) => {
    const borders = req.url.searchParams.get("codes");

    if (borders === "GIN,LBR") {
      return res(ctx.status(200), ctx.json(mockBorders.data));
    } else {
      return res(ctx.status(404), ctx.json({ message: "Not Found" }));
    }
  }),

  rest.get(`${API_URL}/region/:region`, (req, res, ctx) => {
    const { region } = req.params;

    if (region === "Oceania") {
      return res(ctx.status(200), ctx.json(mockCountriesOceania.data));
    } else {
      return res(ctx.status(404), ctx.json({ message: "Not Found" }));
    }
  }),

  rest.get(`${API_URL}/name/:name`, (req, res, ctx) => {
    const { name } = req.params;
    const fullText = req.url.searchParams.get("fullText");

    if (name === "island") {
      return res(ctx.status(200), ctx.json(mockCountryByName.data));
    } else if (name === "Germany" && fullText) {
      return res(ctx.status(200), ctx.json(mockCountryByFullName.data));
    } else {
      return res(ctx.status(404), ctx.json({ message: "Not Found" }));
    }
  }),
];
