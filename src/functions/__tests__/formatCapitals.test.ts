import { formatCapitals } from "../formatCapitals";

test("Function formatCapitals should format an array of cities into a comma-separated string correctly.", () => {
  const mockCapitals = ["Brasília", "Vienna", "Freetown", "Jerusalem"];
  const result = formatCapitals(mockCapitals);

  expect(result).toEqual("Brasília, Vienna, Freetown, Jerusalem");
});
