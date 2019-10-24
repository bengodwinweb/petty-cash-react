export default box => {
  const sum =
    Math.round(box.twenties * 20 * 100) / 100 +
    Math.round(box.tens * 10 * 100) / 100 +
    Math.round(box.fives * 5 * 100) / 100 +
    Math.round(box.ones * 100) / 100 +
    Math.round(box.qrolls * 10 * 100) / 100 +
    Math.round(box.drolls * 5 * 100) / 100 +
    Math.round(box.nrolls * 2 * 100) / 100 +
    Math.round(box.prolls * 0.5 * 100) / 100 +
    Math.round(box.quarters * 0.25 * 100) / 100 +
    Math.round(box.dimes * 0.1 * 100) / 100 +
    Math.round(box.nickels * 0.05 * 100) / 100 +
    Math.round(box.pennies * 0.01 * 100) / 100;
  return Math.round(sum * 100) / 100;
};
