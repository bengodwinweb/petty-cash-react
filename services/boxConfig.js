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
  return Math.round(sum * 100) / 100;
};

// Internal
const decrementBox = (box, idealTotal) => {
  const resultBox = box;
  const total = Math.round(Number(idealTotal) * 100) / 100;

  console.log('=================================');
  console.log(`DECREMENT ${sumBox(resultBox)} to ${total}`);

  if (sumBox(resultBox) > total) {
    while (sumBox(resultBox) - 20 >= total && resultBox.twenties > 0) {
      resultBox.twenties--;
    }
    while (sumBox(resultBox) - 10 >= total && resultBox.tens > 0) {
      resultBox.tens--;
    }
    while (sumBox(resultBox) - 5 >= total && resultBox.fives > 0) {
      resultBox.fives--;
    }
    while (sumBox(resultBox) - 1 >= total && resultBox.ones > 0) {
      resultBox.ones--;
    }
    while (sumBox(resultBox) - 0.25 >= total && resultBox.quarters > 0) {
      resultBox.quarters--;
    }
    while (sumBox(resultBox) - 0.1 >= total && resultBox.dimes > 0) {
      resultBox.dimes--;
    }
    while (sumBox(resultBox) - 0.05 >= total && resultBox.nickels > 0) {
      resultBox.nickels--;
    }
    while (sumBox(resultBox) - 0.01 >= total && resultBox.pennies > 0) {
      resultBox.pennies--;
    }
  }

  resultBox.boxTotal = sumBox(resultBox).toFixed(2);
  console.log(`newTotal = ${resultBox.boxTotal}`);
  return resultBox;
};

// Internal
const incrementBox = (box, idealTotal) => {
  const resultBox = box;
  const total = Math.round(Number(idealTotal) * 100) / 100;

  console.log('=================================');
  console.log(`INCREMENT ${sumBox(resultBox)} to ${idealTotal}`);

  if (sumBox(resultBox) < total) {
    while (sumBox(resultBox) + 20 <= total) {
      resultBox.twenties++;
    }
    while (sumBox(resultBox) + 10 <= total) {
      resultBox.tens++;
    }
    while (sumBox(resultBox) + 5 <= total) {
      resultBox.fives++;
    }
    while (sumBox(resultBox) + 1 <= total) {
      resultBox.ones++;
    }
    while (sumBox(resultBox) + 0.25 <= total) {
      resultBox.quarters++;
    }
    while (sumBox(resultBox) + 0.1 <= total) {
      resultBox.dimes++;
    }
    while (sumBox(resultBox) + 0.05 <= total) {
      resultBox.nickels++;
    }
    while (sumBox(resultBox) + 0.01 <= total) {
      resultBox.pennies++;
    }
  }

  resultBox.boxTotal = sumBox(resultBox).toFixed(2);
  console.log(`newTotal = ${resultBox.boxTotal}`);
  return resultBox;
};

const updateBox = (box, idealTotal) => {
  let resultBox = box;
  resultBox = incrementBox(resultBox, idealTotal);
  resultBox = decrementBox(resultBox, idealTotal);

  return resultBox;
};

// TODO - fix this so that it balances change in a way that makes sense
const makeChange = currentSpent => {
  let resultBox = emptyBox;
  resultBox = incrementBox(resultBox, currentSpent);

  return resultBox;
};

module.exports = {
  defaultBox,
  emptyBox,
  updateBox,
  makeChange
};
