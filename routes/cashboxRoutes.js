const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const _ = require('lodash');
const requireAuth = require('../middleware/auth/requireAuth');
const { updateCashbox, resetCashbox } = require('../services/cashboxConfig');
const { defaultBox, emptyBox, updateBox } = require('../services/boxConfig');

const Cashbox = mongoose.model('Cashbox');
const Box = mongoose.model('Box');

// Index
router.get('/', requireAuth, async (req, res) => {
  console.log('GET to /api/cashboxes');
  const cashboxes = await Cashbox.find({ _user: req.user.id })
    .select({
      transactions: false
    })
    .sort({ date: 'desc' });

  res.send(cashboxes);
});

// Create
router.post('/', requireAuth, async (req, res) => {
  console.log('POST to /api/cashboxes');
  let { companyName, cashboxName, fundTotal = 500 } = req.body;
  fundTotal = parseFloat(fundTotal).toFixed(2);

  // Init currentBox and idealBox
  let currentBox = new Box(_.clone(defaultBox));
  let idealBox = new Box(_.clone(defaultBox));

  // Increment or decrement the values in currentBox and
  // idealBox so that currentBox.boxTotal === fundTotal
  currentBox = updateBox(currentBox, fundTotal);
  idealBox = updateBox(idealBox, fundTotal);

  // Init changeBox -- inital values of 0
  const changeBox = new Box(_.clone(emptyBox));

  const cashbox = new Cashbox({
    companyName,
    cashboxName,
    fundTotal,
    _user: req.user.id,
    currentBox,
    changeBox,
    idealBox
  });

  cashbox.currentBox._cashbox = cashbox._id;
  cashbox.changeBox._cashbox = cashbox._id;
  cashbox.idealBox._cashbox = cashbox._id;

  try {
    await cashbox.save();
    await currentBox.save();
    await changeBox.save();
    await idealBox.save();

    res.redirect('/api/cashboxes');
  } catch (err) {
    console.log(err);
    res.status(422).send(err);
  }
});

// Read
router.get('/:id', requireAuth, async (req, res) => {
  console.log(`GET to /api/cashboxes/${req.params.id}`);

  const cashbox = await Cashbox.findOne({ _id: req.params.id })
    .populate('transactions')
    .populate('currentBox')
    .populate('changeBox')
    .populate('idealBox');

  res.send(cashbox);
});

// Update
router.put('/:id', requireAuth, async (req, res) => {
  console.log(`PUT to /api/cashboxes/${req.params.id}`);

  try {
    await Cashbox.findByIdAndUpdate(req.params.id, req.body);
  } catch (err) {
    console.log(err);
    return res.status(422).send(err);
  }

  let cashbox = await Cashbox.findOne({ _id: req.params.id })
    .populate('transactions')
    .populate('currentBox')
    .populate('changeBox')
    .populate('idealBox');

  let idealBox = new Box(_.clone(defaultBox));
  idealBox = updateBox(idealBox, cashbox.fundTotal);
  cashbox.idealBox = idealBox;
  cashbox.idealBox._cashbox = cashbox._id;

  try {
    cashbox = await updateCashbox(cashbox);

    await cashbox.idealBox.save();
    await cashbox.save();

    return res.send(cashbox);
  } catch (err) {
    console.log(err);
    res.status(422).send(err);
  }
});

// Reset
router.get('/:id/reset', requireAuth, async (req, res) => {
  let cashbox = await Cashbox.findById(req.params.id)
    .populate('idealBox')
    .populate('currentBox')
    .populate('changeBox')
    .populate('transactions');
  console.log(cashbox);

  cashbox = resetCashbox(cashbox);
  console.log(cashbox);

  try {
    await cashbox.currentBox.save();
    await cashbox.changeBox.save();
    await cashbox.save();

    return res.send(cashbox);
  } catch (err) {
    console.log(err);
    return res.status(400).send(err);
  }
});

// Destroy
router.delete('/:id', requireAuth, async (req, res) => {
  console.log(`DELETE to /api/cashboxes/${req.params.id}`);
  Cashbox.deleteOne({ _id: req.params.id }, err => {
    if (err) {
      console.log(err);
      return res.status(422).send(err);
    }
  });

  console.log('no error');
  res.send({});
});

module.exports = router;
