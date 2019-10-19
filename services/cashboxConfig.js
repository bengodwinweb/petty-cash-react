const { incrementBox, decrementBox } = require('./boxConfig');

module.exports.updateCashbox = receivedBox => {
  const cashbox = receivedBox;
  console.log(`updatebox - ${cashbox._id}`);

  // Update currentSpent to match total of transaction amounts
  cashbox.currentSpent = cashbox.transactions
    .map(transaction => transaction.amount)
    .reduce((acc, val) => acc + val)
    .toFixed(2);

  // Decrement the currentBox to the current total the transaction amount
  cashbox.currentBox = decrementBox(
    cashbox.currentBox,
    (cashbox.fundTotal - cashbox.currentSpent).toFixed(2)
  );

  // Increment the changeBox to match the total spent
  cashbox.changeBox = incrementBox(cashbox.changeBox, cashbox.currentSpent);

  return cashbox;
};
