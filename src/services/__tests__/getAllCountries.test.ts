import { mockCountries } from "../../mocks/countries";
import { getAllCountries } from "../getAllCountries";

describe("Function getAllCountries", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it("should return a list of countries", async () => {
    const result = await getAllCountries();
    expect(result).toEqual(mockCountries);
  });
});
