const mongoose = require('mongoose');
const requireAuth = require('../middleware/auth/requireAuth');
const { updateCashbox } = require('../services/cashboxConfig');

const Cashbox = mongoose.model('Cashbox');
const Transaction = mongoose.model('Transaction');

module.exports = app => {
  // Get transactions
  app.get('/api/cashboxes/:id/transactions', requireAuth, (req, res) => {
    return res.send({ greeting: `transactions for cashbox ${req.params.id}` });
  });

  // Create transaction
  app.post('/api/cashboxes/:id/transactions', requireAuth, async (req, res) => {
    console.log(`POST to /api/cashboxes/${req.params.id}/transactions`);

    let cashbox = await Cashbox.findOne({ _id: req.params.id })
      .populate('currentBox')
      .populate('changeBox')
      .populate('transactions');

    const transaction = new Transaction(req.body);
    transaction._cashbox = cashbox._id;

    // Add the transaction to the cashbox
    cashbox.transactions.push(transaction);

    // Update cashbox
    cashbox = updateCashbox(cashbox);

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

  // Edit Transaction
};
