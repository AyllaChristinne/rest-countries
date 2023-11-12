import { mockCountryByName } from "../../mocks/countries";
import { getCountryByName } from "../getCountryByName";

describe("Function getCountriesByRegion", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it("should return a list of countries filtered by name", async () => {
    const result = await getCountryByName("island");
    expect(result).toEqual(mockCountryByName);
  });

  it("should return an error when country name is invalid", async () => {
    const result = await getCountryByName("Zeus");
    expect(result).toEqual({
      success: false,
      error: "Request failed with status code 404",
    });
  });
});
