const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const _ = require('lodash');
const requireAuth = require('../middleware/auth/requireAuth');
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
  console.log(fundTotal);

  let currentBox = new Box(defaultBox);

  // Increment or decrement the values in currentBox so that
  // currentBox.boxTotal === fundTotal
  currentBox = updateBox(currentBox, fundTotal);

  // Init changeBox -- inital values of 0
  const changeBox = new Box(_.clone(emptyBox));

  const cashbox = new Cashbox({
    companyName,
    cashboxName,
    fundTotal,
    _user: req.user.id,
    currentBox,
    changeBox
  });

  cashbox.currentBox._cashbox = cashbox._id;
  cashbox.changeBox._cashbox = cashbox._id;

  try {
    await cashbox.save();
    await currentBox.save();
    await changeBox.save();

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
    .populate('changeBox');

  res.send(cashbox);
});

// Destroy
router.delete('/:id', requireAuth, async (req, res) => {
  console.log(`DELETE to /api/cashboxes/${req.params.id}`);
  Cashbox.deleteOne({ _id: req.params.id }, err => {
    if (err) {
      console.log("we be errin'");
      console.log(err);
      return res.redirect(`/api/cashboxes/${req.params.id}`);
    }
  });

  console.log('no error');
  res.send({});
});

module.exports = router;
