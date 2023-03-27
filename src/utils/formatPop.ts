export const formatPop = (pop: number) => {
  var newPop = "";
  var oldPopStr = pop + "";
  var done = 0;
  var parts = oldPopStr.split(".");
  for (var j = parts[0].length - 1; j >= 0; j--) {
      newPop = parts[0][j] + newPop;
      done++;
      if ((done % 3) == 0)
          newPop = " " + newPop;
  }
  return newPop;
}