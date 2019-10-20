const { updateBox, makeChange } = require('./boxConfig');

module.exports.updateCashbox = async cashbox => {
  console.log(`updatebox - ${cashbox._id}`);

  // Update currentSpent to match total of transaction amounts
  if (cashbox.transactions.length > 0) {
    cashbox.currentSpent = cashbox.transactions
      .map(transaction => transaction.amount)
      .reduce((acc, val) => acc + val)
      .toFixed(2);
  } else {
    cashbox.currentSpent = 0;
  }

  // Decrement the currentBox to the current total the transaction amount
  cashbox.currentBox = updateBox(
    cashbox.currentBox,
    (cashbox.fundTotal - cashbox.currentSpent).toFixed(2)
  );

  cashbox.changeBox = makeChange(cashbox);

  try {
    await cashbox.currentBox.save();
    await cashbox.changeBox.save();
    await cashbox.save();

    return cashbox;
  } catch (err) {
    console.log(err);
  }
};
