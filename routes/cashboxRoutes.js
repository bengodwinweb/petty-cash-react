const requireAuth = require('../middleware/auth/requireAuth');
const mongoose = require('mongoose');

const Cashbox = mongoose.model('Cashbox');
const Box = mongoose.model('Box');

// Box helpers
const {
  defaultBox,
  incrementBox,
  decrementBox,
  makeChange
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

    let currentBox = new Box(defaultBox);

    // Increment or decrement the values in currentBox so that
    // currentBox.boxTotal === fundTotal
    decrementBox(currentBox, fundTotal);
    incrementBox(currentBox, fundTotal);

    // TODO - change to new Box(emptyBox) after
    // creating update and post transaction routes
    // Init changeBox -- inital values of 0
    const changeBox = new Box(makeChange(currentBox, fundTotal));

    const cashbox = new Cashbox({
      companyName,
      cashboxName,
      fundTotal: parseFloat(fundTotal).toFixed(2),
      _user: req.user.id,
      currentBox,
      changeBox
    });

    try {
      await cashbox.save();

      console.log(cashbox);
      res.redirect('/api/cashboxes');
    } catch (err) {
      res.status(422).send(err);
    }
  });
};
