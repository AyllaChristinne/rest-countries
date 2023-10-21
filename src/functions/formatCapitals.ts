export const formatCapitals = (capitals: Array<string>) => {
  let formattedCapitals = "";

  capitals.forEach((capital, index) => {
    formattedCapitals += capital;

    if (index < capitals.length - 1) {
      formattedCapitals += ", ";
    }
  });

  return formattedCapitals;
};
