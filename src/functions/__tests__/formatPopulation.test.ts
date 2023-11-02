import { formatPopulation } from "../formatPopulation";

test("Function formatPopulation should format a number into human-readable correctly.", () => {
  const mockPopulation = 216497553;
  const result = formatPopulation(mockPopulation);

  expect(result).toEqual("216.497.553");
});
