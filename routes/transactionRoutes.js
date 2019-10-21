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

  try {
    transaction.save();
    cashbox = await cashbox.save();

    // Update cashbox
    updateCashbox(cashbox);
  } catch (err) {
    res.status(422).send(err);
  }

  res.redirect(`/api/cashboxes/${req.params.id}`);
});

router.put('/:transactionId', requireAuth, async (req, res) => {
  console.log(
    `PUT to /api/cashboxes/${req.params.id}/transactions/${req.params.transactionId}`
  );

  let editedTransaction = req.body;

  try {
    await Transaction.findByIdAndUpdate(
      req.params.transactionId,
      editedTransaction
    );
  } catch (err) {
    console.log(err);
  }

  let cashbox = await Cashbox.findOne({ _id: req.params.id })
    .populate('transactions')
    .populate('currentBox')
    .populate('changeBox')
    .populate('idealBox');

  try {
    updateCashbox(cashbox);

    await cashbox.save();

    return res.send(cashbox);
  } catch (err) {
    console.log(err);
  }

  res.redirect(`/api/cashboxes/${req.params.id}`);
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
    .populate('changeBox')
    .populate('idealBox');

  try {
    cashbox = await cashbox.save();

    // Update cashbox
    updateCashbox(cashbox);
  } catch (err) {
    res.status(422).send(err);
  }

  res.send(cashbox);
});

module.exports = router;
