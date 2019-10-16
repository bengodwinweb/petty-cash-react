const requireAuth = require('../middleware/auth/requireAuth');
const mongoose = require('mongoose');

const Cashbox = mongoose.model('Cashbox');
const Box = mongoose.model('Box');

// Box helpers
const {
  defaultBox,
  incrementBox,
  decrementBox
} = require('../services/boxConfig');

module.exports = app => {
  app.get('/api/cashboxes', requireAuth, async (req, res) => {
    const cashboxes = await Cashbox.find({ _user: req.user.id })
      .select({
        transactions: false
      })
      .sort({ date: 'desc' });

    res.send(cashboxes);
  });

  app.post('/api/cashboxes', requireAuth, async (req, res) => {
    const { companyName, cashboxName, fundTotal } = req.body;

    const cashbox = new Cashbox({
      companyName,
      cashboxName,
      fundTotal: parseFloat(fundTotal).toFixed(2),
      _user: req.user.id,
      currentBox: new Box(defaultBox)
    });

    if (cashbox.currentBox.boxTotal > cashbox.fundTotal) {
      cashbox.currentBox = decrementBox(cashbox.currentBox, cashbox.fundTotal);
    } else if (cashbox.currentBox.boxTotal < cashbox.fundTotal) {
      cashbox.currentBox = incrementBox(cashbox.currentBox, cashbox.fundTotal);
    }

    try {
      await cashbox.save();

      res.redirect('/api/cashboxes');
    } catch (err) {
      res.status(422).send(err);
    }
  });
};
