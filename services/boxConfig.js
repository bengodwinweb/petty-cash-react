const _ = require('lodash');
const mongoose = require('mongoose');

// objects - emptyBox, defaultBox
// internal functions - _sumBox(), _decrementBox(), _incrementBox()
// exposed functions - updateBox(), makeChange(), resetCurrent()

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
  pennies: 0
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
  pennies: 50,
  boxTotal: 500
};

const _sumBox = box => {
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

const _cascadeChange = box => {
  while (box.pennies >= 5) {
    box.pennies -= 5;
    box.nickels += 1;
  }
  while (box.dimes >= 3) {
    box.dimes -= 3;
    box.quarters += 1;
    box.nickels += 1;
  }
  while (box.nickels >= 5) {
    box.nickels -= 5;
    box.quarters += 1;
  }
  while (box.nickels >= 2) {
    box.nickels -= 2;
    box.dimes += 1;
  }
  while (box.quarters >= 4) {
    box.quarters -= 4;
    box.ones += 1;
  }
  return box
}

const _addRolls = cashbox => {
  if (cashbox.changeBox.quarters + cashbox.currentBox.quarters < cashbox.idealBox.quarters) {
    if (cashbox.changeBox.tens > 0) {
      cashbox.changeBox.tens -= 1;
      cashbox.changeBox.qrolls += 1;
    } else if (cashbox.changeBox.twenties > 0) {
      cashbox.changeBox.twenties -= 1;
      cashbox.changeBox.tens += 1;
      cashbox.changeBox.qrolls += 1;
    }
  }
  if (cashbox.changeBox.dimes + cashbox.currentBox.dimes < cashbox.idealBox.dimes) {
    if (cashbox.changeBox.fives > 0) {
      cashbox.changeBox.fives -= 1;
      cashbox.changeBox.drolls += 1;
    } else if (cashbox.changeBox.tens > 0) {
      cashbox.changeBox.tens -= 1;
      cashbox.changeBox.fives += 1;
      cashbox.changeBox.drolls += 1;
    }
  }
  if (cashbox.changeBox.nickels + cashbox.currentBox.nickels < cashbox.idealBox.nickels) {
    if (cashbox.changeBox.ones > 5) {
      cashbox.changeBox.ones -= 2;
      cashbox.changeBox.nrolls += 1;
    } else if (cashbox.changeBox.fives > 4) {
      cashbox.changeBox.fives -= 1;
      cashbox.changeBox.ones += 3;
      cashbox.changeBox.nrolls += 1;
    }
  }
  if (cashbox.changeBox.pennies + cashbox.currentBox.pennies < cashbox.idealBox.pennies) {
    if (cashbox.changeBox.ones > 10) {
      cashbox.changeBox.ones -= 1;
      cashbox.changeBox.prolls += 2;
    } else if (cashbox.changeBox.fives > 4) {
      cashbox.changeBox.fives -= 1;
      cashbox.changeBox.ones += 4;
      cashbox.changeBox.prolls += 2;
    }
  }
  return cashbox
}

const _decrementBox = (box, idealTotal) => {
  let resultBox = box;
  const total = Math.round(Number(idealTotal) * 100) / 100;

  console.log('=================================');
  console.log(`DECREMENT ${_sumBox(resultBox)} to ${total}`);

  while (_sumBox(resultBox) > total) {
    while (_sumBox(resultBox) - 20 >= total && resultBox.twenties > 0) {
      resultBox.twenties--;
    }
    while (_sumBox(resultBox) - 10 >= total && resultBox.tens > 0) {
      resultBox.tens--;
      if (
        resultBox.tens === 0 &&
        _sumBox(resultBox) - 10 >= total &&
        resultBox.twenties > 0
      ) {
        resultBox.tens += 2;
        resultBox.twenties--;
      }
    }
    while (_sumBox(resultBox) - 5 >= total && resultBox.fives > 0) {
      resultBox.fives--;
      if (
        resultBox.fives === 0 &&
        _sumBox(resultBox) - 5 >= total &&
        resultBox.tens > 0
      ) {
        resultBox.fives += 2;
        resultBox.tens--;
      }
    }
    while (_sumBox(resultBox) - 1 >= total && resultBox.ones > 0) {
      resultBox.ones--;
      if (
        resultBox.ones === 0 &&
        _sumBox(resultBox) - 1 >= total &&
        resultBox.fives > 0
      ) {
        resultBox.ones += 5;
        resultBox.fives--;
      }
    }
    while (_sumBox(resultBox) - 0.25 >= total && resultBox.quarters > 0) {
      resultBox.quarters--;
      if (
        resultBox.quarters === 0 &&
        _sumBox(resultBox) - 0.25 >= total &&
        resultBox.ones > 0
      ) {
        resultBox.quarters += 4;
        resultBox.ones--;
      }
    }
    while (_sumBox(resultBox) - 0.1 >= total && resultBox.dimes > 0) {
      resultBox.dimes--;
      if (
        resultBox.dimes === 0 &&
        _sumBox(resultBox) - 0.1 >= total &&
        resultBox.quarters > 0
      ) {
        resultBox.dimes += 2;
        resultBox.nickels += 1;
        resultBox.quarters--;
      }
    }
    while (_sumBox(resultBox) - 0.05 >= total && resultBox.nickels > 0) {
      resultBox.nickels--;
      if (
        resultBox.nickels === 0 &&
        _sumBox(resultBox) - 0.05 >= total &&
        resultBox.dimes > 0
      ) {
        resultBox.nickels += 2;
        resultBox.dimes--;
      }
    }
    while (_sumBox(resultBox) - 0.01 >= total && resultBox.pennies > 0) {
      resultBox.pennies--;
      if (
        resultBox.pennies === 0 &&
        _sumBox(resultBox) - 0.01 >= total &&
        resultBox.nickels > 0
      ) {
        resultBox.pennies += 5;
        resultBox.nickels--;
      }
    }

    // ????
    if (_sumBox(resultBox) > total) {
      if (resultBox.twenties > 0) {
        resultBox.twenties--;
        resultBox = _incrementBox(resultBox, total);
      } else {
        if (resultBox.tens > 0) {
          resultBox.tens--;
          resultBox = _incrementBox(resultBox, total);
        }
      }
    }
  }

  resultBox.boxTotal = _sumBox(resultBox).toFixed(2);
  console.log(`newTotal = ${resultBox.boxTotal}`);
  return resultBox;
};

const _incrementBox = (box, idealTotal) => {
  const resultBox = box;
  const total = Math.round(Number(idealTotal) * 100) / 100;

  console.log('=================================');
  console.log(`INCREMENT ${_sumBox(resultBox)} to ${idealTotal}`);

  if (_sumBox(resultBox) < total) {
    while (_sumBox(resultBox) + 20 <= total) {
      resultBox.twenties++;
    }
    while (_sumBox(resultBox) + 10 <= total) {
      resultBox.tens++;
    }
    while (_sumBox(resultBox) + 5 <= total) {
      resultBox.fives++;
    }
    while (_sumBox(resultBox) + 1 <= total) {
      resultBox.ones++;
    }
    while (_sumBox(resultBox) + 0.25 <= total) {
      resultBox.quarters++;
    }
    while (_sumBox(resultBox) + 0.1 <= total) {
      resultBox.dimes++;
    }
    while (_sumBox(resultBox) + 0.05 <= total) {
      resultBox.nickels++;
    }
    while (_sumBox(resultBox) + 0.01 <= total) {
      resultBox.pennies++;
    }
  }

  resultBox.boxTotal = _sumBox(resultBox).toFixed(2);
  console.log(`newTotal = ${resultBox.boxTotal}`);
  return resultBox;
};

const updateBox = (box, idealTotal) => {
  let resultBox = box;
  resultBox = _incrementBox(resultBox, idealTotal);
  resultBox = _decrementBox(resultBox, idealTotal);

  return resultBox;
};

// TODO - fix this so that it balances change in a way that makes sense
const makeChange = cashbox => {
  Object.keys(emptyBox).forEach(key => {
    const value = cashbox.idealBox[key] - cashbox.currentBox[key];
    if (value > 0) {
      cashbox.changeBox[key] = value;
    } else {
      cashbox.changeBox[key] = 0;
    }
  });

  cashbox.changeBox.boxTotal = _sumBox(cashbox.changeBox);

  cashbox.changeBox = _incrementBox(cashbox.changeBox, cashbox.currentSpent);
  cashbox.changeBox = _decrementBox(cashbox.changeBox, cashbox.currentSpent);

  // Cascade change back up if there are too many
  cashbox.changeBox = _cascadeChange(cashbox.changeBox)

  // Add coin rolls if coins are below ideal
  cashbox = _addRolls(cashbox)

  return cashbox.changeBox;
};

const resetCurrent = inputBox => {
  let cashbox = inputBox;

  Object.keys(emptyBox).forEach(key => {
    cashbox.currentBox[key] += cashbox.changeBox[key];
    cashbox.changeBox[key] = 0;
  });

  cashbox.currentBox.boxTotal = _sumBox(cashbox.currentBox);
  cashbox.changeBox.boxTotal = 0;

  return cashbox;
};

module.exports = {
  defaultBox,
  emptyBox,
  updateBox,
  makeChange,
  resetCurrent
};
