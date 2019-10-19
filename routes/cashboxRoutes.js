const requireAuth = require('../middleware/auth/requireAuth');
const mongoose = require('mongoose');

const { defaultBox, emptyBox, updateBox } = require('../services/boxConfig');

const Cashbox = mongoose.model('Cashbox');
const Box = mongoose.model('Box');

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
    console.log('post to /api/cashboxes');
    let { companyName, cashboxName, fundTotal = 500 } = req.body;
    fundTotal = parseFloat(fundTotal).toFixed(2);
    console.log(fundTotal);

    let currentBox = new Box(defaultBox);

    // Increment or decrement the values in currentBox so that
    // currentBox.boxTotal === fundTotal
    currentBox = updateBox(currentBox, fundTotal);

    // Init changeBox -- inital values of 0
    const changeBox = new Box(emptyBox);

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
      res.status(422).send(err);
    }
  });

  app.get('/api/cashboxes/:id', requireAuth, async (req, res) => {
    console.log(`get to /api/cashboxes/${req.params.id}`);

    const cashbox = await Cashbox.findOne({ _id: req.params.id })
      .populate('transactions')
      .populate('currentBox')
      .populate('changeBox');

    res.send(cashbox);
  });
};
