const mongoose = require('mongoose');
const requireAuth = require('../middleware/auth/requireAuth');
// Box helpers
const {
  defaultBox,
  incrementBox,
  decrementBox,
  makeChange
} = require('../services/boxConfig');

const Cashbox = mongoose.model('Cashbox');
const Transaction = mongoose.model('Transaction');
const Box = mongoose.model('Box');

module.exports = app => {
  app.get('/api/cashboxes/:id/transactions', requireAuth, (req, res) => {
    return res.send({ greeting: `transactions for cashbox ${req.params.id}` });
  });

  app.post('/api/cashboxes/:id/transactions', requireAuth, async (req, res) => {
    console.log(`POST to /api/cashboxes/${req.params.id}/transactions`);

    const newTransaction = req.body;
    let cashbox = await Cashbox.findOne({ _id: req.params.id })
      .populate('currentBox')
      .populate('changeBox');

    const transaction = new Transaction(newTransaction);
    transaction._cashbox = cashbox._id;

    // Add the transaction to the cashbox
    cashbox.transactions.push(transaction._id);

    // Increment the currentSpent by the transaction amount
    cashbox.currentSpent += transaction.amount;

    // Decrement the currentBox to the current total the transaction amount
    cashbox.currentBox = decrementBox(
      cashbox.currentBox,
      cashbox.fundTotal - cashbox.currentSpent
    );

    // Increment the changeBox by the transaction amount
    cashbox.changeBox = incrementBox(cashbox.changeBox, cashbox.currentSpent);

    try {
      transaction.save();
      cashbox.changeBox.save();
      cashbox.currentBox.save();
      cashbox.save();

      res.redirect(`/api/cashboxes/${req.params.id}`);
    } catch (err) {
      res.status(422).send(err);
    }
  });
};
