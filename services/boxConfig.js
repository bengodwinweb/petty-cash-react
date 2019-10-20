const _ = require('lodash');
const mongoose = require('mongoose');

const Cashbox = mongoose.model('Cashbox');

// objects - emptyBox, defaultBox
// internal functions - _sumBox(), _decrementBox(), _incrementBox()
// exposed functions - updateBox(), makeChange()

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

// Internal
const _sumBox = box => {
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
const _decrementBox = (box, idealTotal) => {
  const resultBox = box;
  const total = Math.round(Number(idealTotal) * 100) / 100;

  console.log('=================================');
  console.log(`DECREMENT ${_sumBox(resultBox)} to ${total}`);

  if (_sumBox(resultBox) > total) {
    while (_sumBox(resultBox) - 20 >= total && resultBox.twenties > 0) {
      resultBox.twenties--;
    }
    while (_sumBox(resultBox) - 10 >= total && resultBox.tens > 0) {
      resultBox.tens--;
    }
    while (_sumBox(resultBox) - 5 >= total && resultBox.fives > 0) {
      resultBox.fives--;
    }
    while (_sumBox(resultBox) - 1 >= total && resultBox.ones > 0) {
      resultBox.ones--;
    }
    while (_sumBox(resultBox) - 0.25 >= total && resultBox.quarters > 0) {
      resultBox.quarters--;
    }
    while (_sumBox(resultBox) - 0.1 >= total && resultBox.dimes > 0) {
      resultBox.dimes--;
    }
    while (_sumBox(resultBox) - 0.05 >= total && resultBox.nickels > 0) {
      resultBox.nickels--;
    }
    while (_sumBox(resultBox) - 0.01 >= total && resultBox.pennies > 0) {
      resultBox.pennies--;
    }
  }

  resultBox.boxTotal = _sumBox(resultBox).toFixed(2);
  console.log(`newTotal = ${resultBox.boxTotal}`);
  return resultBox;
};

// Internal
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

  return cashbox.changeBox;
};

module.exports = {
  defaultBox,
  emptyBox,
  updateBox,
  makeChange
};
