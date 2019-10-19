const emptyBox = {
  twenties: 0,
  tens: 0,
  fives: 0,
  ones: 0,
  qrolls: 0,
  drolls: 0,
  nrolls: 0,
  prolls: 0,
  quarters: 0,
  dimes: 0,
  nickels: 0,
  pennies: 0,
  boxTotal: 0
};

const defaultBox = {
  twenties: 14,
  tens: 11,
  fives: 11,
  ones: 38,
  qrolls: 0,
  drolls: 0,
  nrolls: 0,
  prolls: 0,
  quarters: 40,
  dimes: 50,
  nickels: 30,
  pennies: 50
};

// Internal
const sumBox = box => {
  const sum =
    box.twenties * 20 +
    box.tens * 10 +
    box.fives * 5 +
    box.ones +
    box.qrolls * 10 +
    box.drolls * 5 +
    box.nrolls * 2 +
    box.prolls * 0.5 +
    box.quarters * 0.25 +
    box.dimes * 0.1 +
    box.nickels * 0.05 +
    box.pennies * 0.01;
  return parseFloat(sum).toFixed(2);
};

// Internal
const decrementBox = (box, idealTotal) => {
  console.log(`DECREMENT ${sumBox(box)} to ${idealTotal}`);
  while (sumBox(box) > idealTotal) {
    while (sumBox(box) - 20 >= idealTotal && box.twenties > 0) {
      box.twenties--;
    }
    while (sumBox(box) - 10 >= idealTotal && box.tens > 0) {
      box.tens--;
    }
    while (sumBox(box) - 5 >= idealTotal && box.fives > 0) {
      box.fives--;
    }
    while (sumBox(box) - 1 >= idealTotal && box.ones > 0) {
      box.ones--;
    }
    while (sumBox(box) - 0.25 >= idealTotal && box.quarters > 0) {
      box.quarters--;
    }
    while (sumBox(box) - 0.1 >= idealTotal && box.dimes > 0) {
      box.dimes--;
    }
    while (sumBox(box) - 0.05 >= idealTotal && box.nickels > 0) {
      box.nickels--;
    }
    while (sumBox(box) - 0.01 >= idealTotal && box.pennies > 0) {
      box.pennies--;
    }
  }
  box.boxTotal = sumBox(box);
  return box;
};

// Internal
const incrementBox = (box, idealTotal) => {
  console.log(`INCREMENT ${sumBox(box)} to ${idealTotal}`);
  while (sumBox(box) < idealTotal) {
    while (sumBox(box) <= idealTotal - 20) {
      box.twenties++;
    }
    while (sumBox(box) <= idealTotal - 10) {
      box.tens++;
    }
    while (sumBox(box) <= idealTotal - 5) {
      box.fives++;
    }
    while (sumBox(box) <= idealTotal - 1) {
      box.ones++;
    }
    while (sumBox(box) <= idealTotal - 0.25) {
      box.quarters++;
    }
    while (sumBox(box) <= idealTotal - 0.1) {
      box.dimes++;
    }
    while (sumBox(box) <= idealTotal - 0.05) {
      box.nickels++;
    }
    while (sumBox(box) <= idealTotal - 0.01) {
      box.pennies++;
    }
  }
  box.boxTotal = sumBox(box);
  return box;
};

const updateBox = (box, idealTotal) => {
  let resultBox = box;
  resultBox = incrementBox(resultBox, idealTotal);
  resultBox = decrementBox(resultBox, idealTotal);

  return resultBox;
};

// Get rid of this
const makeChange = (box, fundTotal) => {
  const diff = fundTotal - sumBox(box);
  let resultBox = emptyBox;

  if (sumBox(resultBox) < diff) {
    incrementBox(resultBox, diff);
  }

  return resultBox;
};

module.exports = {
  defaultBox,
  emptyBox,
  updateBox
};
