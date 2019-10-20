const express = require('express');
const router = express.Router({ mergeParams: true });
const mongoose = require('mongoose');
const requireAuth = require('../middleware/auth/requireAuth');
const { updateCashbox } = require('../services/cashboxConfig');

const Cashbox = mongoose.model('Cashbox');
const Transaction = mongoose.model('Transaction');

// Create transaction
router.post('/', requireAuth, async (req, res) => {
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

// Remove Transaction
router.delete('/:transactionId', requireAuth, async (req, res) => {
  console.log(
    `DELETE to /api/cashboxes/${req.params.id}/transactions/${req.params.transactionId}`
  );

  // Delete transaction
  await Transaction.deleteOne({ _id: req.params.transactionId }, err => {
    if (err) {
      console.log(err);
    }
  });

  // Find cashbox
  let cashbox = await Cashbox.findOne({ _id: req.params.id })
    .populate('transactions')
    .populate('currentBox')
    .populate('changeBox');

  // Update cashbox with new transactions list
  cashbox = updateCashbox(cashbox);

  try {
    await cashbox.save();
    await cashbox.currentBox.save();
    await cashbox.changeBox.save();

    res.send(cashbox);
    // res.redirect(`/api/cashboxes/${req.params.id}`);
  } catch (err) {
    console.log(err);
    res.status(422).send(err);
  }
});

module.exports = router;
