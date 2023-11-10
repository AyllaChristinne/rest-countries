import { mockBorders } from "../../mocks/countries";
import { getBorders } from "../getBorders";

describe("Function getCountriesByRegion", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it("should return a list of countries filtered by region", async () => {
    const result = await getBorders(["GIN", "LBR"]);
    expect(result).toEqual(mockBorders.data);
  });
});
