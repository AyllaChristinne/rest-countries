import { formatLanguages } from "../formatLanguages";

test("Function formatLanguages should format an object of languages into a comma-separated string correctly.", () => {
  const mockLanguages = {
    eng: "English",
    fij: "Fijian",
    hif: "Fiji Hindi",
  };

  const result = formatLanguages(mockLanguages);

  expect(result).toEqual("English, Fijian, Fiji Hindi");
});
