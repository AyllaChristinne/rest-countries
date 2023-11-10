import { mockCountriesOceania } from "../../mocks/countries";
import { getCountriesByRegion } from "../getCountriesByRegion";

describe("Function getCountriesByRegion", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it("should return a list of countries filtered by region", async () => {
    const result = await getCountriesByRegion("Oceania");
    expect(result).toEqual(mockCountriesOceania);
  });

  it("should return an error when region is invalid", async () => {
    const result = await getCountriesByRegion("Zeus");
    expect(result).toEqual({
      success: false,
      error: "Request failed with status code 404",
    });
  });
});
