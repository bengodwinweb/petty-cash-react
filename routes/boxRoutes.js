const express = require('express');
const router = express.Router({ mergeParams: true });
const mongoose = require('mongoose');
const requireAuth = require('../middleware/auth/requireAuth');
const { updateCashbox } = require('../services/cashboxConfig');

const Cashbox = mongoose.model('Cashbox');
const Box = mongoose.model('Box');

router.put('/', requireAuth, async (req, res) => {
  console.log(`PUT to /api/cashboxes/${req.params.id}/box/`);

  const editedBox = req.body;

  try {
    await Box.findByIdAndUpdate(editedBox._id, editedBox);
  } catch (err) {
    console.log(err);
    return res.status(422).send(err);
  }

  const cashbox = await Cashbox.findOne({ _id: req.params.id })
    .populate('transactions')
    .populate('currentBox')
    .populate('changeBox')
    .populate('idealBox');

  try {
    return res.send(cashbox);
  } catch (err) {
    console.log(err);
    return res.status(422).send(err);
  }
});

module.exports = router;
