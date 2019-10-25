const express = require('express');
const router = express.Router({ mergeParams: true });
const mongoose = require('mongoose');
const requireAuth = require('../middleware/auth/requireAuth');
const { updateCashbox } = require('../services/cashboxConfig');

const Cashbox = mongoose.model('Cashbox');
const Box = mongoose.model('Box');

router.put('/:type', requireAuth, async (req, res) => {
  console.log(`PUT to /api/cashboxes/${req.params.id}/box/${req.params.type}`);

  const boxType = req.params.type;

  console.log(boxType);
  // console.log(req.body);

  if (boxType !== 'currentBox' && boxType !== 'changeBox') {
    console.log('bad box type');
    return res.send({ error: 'unprocessable box type' });
  }

  let cashbox = await Cashbox.findOne({ _id: req.params.id }).populate(boxType);
  console.log(cashbox);

  res.send({ message: 'ok' });
});

module.exports = router;
