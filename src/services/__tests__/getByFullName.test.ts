import { mockCountryByFullName } from "../../mocks/countries";
import { getCountryByFullName } from "../getCountryByFullName";

describe("Function getCountriesByRegion", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it("should return a list of countries filtered by full name", async () => {
    const result = await getCountryByFullName("Germany");
    expect(result).toEqual(mockCountryByFullName);
  });

  it("should return an error when country name is invalid", async () => {
    const result = await getCountryByFullName("Zeus");
    expect(result).toEqual({
      success: false,
      error: "Request failed with status code 404",
    });
  });
});
