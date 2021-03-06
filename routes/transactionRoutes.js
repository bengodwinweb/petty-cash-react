const express = require('express');
const router = express.Router({ mergeParams: true });
const mongoose = require('mongoose');
const requireAuth = require('../middleware/auth/requireAuth');
const requireAuthorization = require('../middleware/auth/requireAuthorization');
const { updateCashbox } = require('../services/cashboxConfig');

const Cashbox = mongoose.model('Cashbox');
const Transaction = mongoose.model('Transaction');

// Create transaction
router.post('/', requireAuth, requireAuthorization, async (req, res) => {
  console.log(`POST to /api/cashboxes/${req.params.id}/transactions`);

  let cashbox = await Cashbox.findOne({ _id: req.params.id })
    .populate('currentBox')
    .populate('changeBox')
    .populate('idealBox')
    .populate({ path: "transactions", options: { sort: { expenseType: 'asc' } } });

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
    return res.status(422).send(err);
  }

  res.redirect(`/api/cashboxes/${req.params.id}`);
});

router.put(
  '/:transactionId',
  requireAuth,
  requireAuthorization,
  async (req, res) => {
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
      return res.status(422).send(err);
    }

    let cashbox = await Cashbox.findOne({ _id: req.params.id })
      .populate({ path: "transactions", options: { sort: { expenseType: 'asc' } } })
      .populate('currentBox')
      .populate('changeBox')
      .populate('idealBox');

    try {
      updateCashbox(cashbox);

      await cashbox.save();

      return res.send(cashbox);
    } catch (err) {
      console.log(err);
      return res.status(422).send(err);
    }

    res.redirect(`/api/cashboxes/${req.params.id}`);
  }
);

// Remove Transaction
router.delete(
  '/:transactionId',
  requireAuth,
  requireAuthorization,
  async (req, res) => {
    console.log(
      `DELETE to /api/cashboxes/${req.params.id}/transactions/${req.params.transactionId}`
    );

    // Delete transaction
    await Transaction.deleteOne({ _id: req.params.transactionId }, err => {
      if (err) {
        console.log(err);
        return res.status(422).send(err);
      }
    });

    // Find cashbox
    let cashbox = await Cashbox.findOne({ _id: req.params.id })
      .populate({ path: "transactions", options: { sort: { expenseType: 'asc' } } })
      .populate('currentBox')
      .populate('changeBox')
      .populate('idealBox');

    try {
      cashbox = await cashbox.save();

      // Update cashbox
      updateCashbox(cashbox);
    } catch (err) {
      console.log(err);
      return res.status(422).send(err);
    }

    res.send(cashbox);
  }
);

module.exports = router;
