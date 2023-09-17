export const formatPopulation = (pop: number) => {
  const popString = pop.toString();
  const parts = popString.split(".");
  let popFormatted = "";

  for (let i = parts[0].length - 1; i >= 0; i--) {
    popFormatted = parts[0][i] + popFormatted;
    if (i > 0 && (parts[0].length - i) % 3 === 0) {
      popFormatted = "." + popFormatted;
    }
  }

  if (parts.length > 1) {
    popFormatted += "." + parts[1];
  }
  return popFormatted;
};
