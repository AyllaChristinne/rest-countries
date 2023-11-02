import { formatCurrencies } from "../formatCurrencies";

test("Function formatCurrencies should format an object of currencies into a comma-separated string correctly.", () => {
  const mockCurrencies = {
    BSD: {
      name: "Bahamian dollar",
      symbol: "$",
    },
    USD: {
      name: "United States dollar",
      symbol: "$",
    },
  };

  const result = formatCurrencies(mockCurrencies);

  expect(result).toEqual("Bahamian dollar, United States dollar");
});
