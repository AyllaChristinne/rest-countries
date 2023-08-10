export const formatPopulation = (pop: number) => {
  let newPop = "";
  const oldPopStr = pop + "";
  let done = 0;
  const parts = oldPopStr.split(".");
  for (let j = parts[0].length - 1; j >= 0; j--) {
    newPop = parts[0][j] + newPop;
    done++;
    if (done % 3 === 0) newPop = " " + newPop;
  }
  return newPop;
};
