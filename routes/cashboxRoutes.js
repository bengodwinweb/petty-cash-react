const requireAuth = require('../middleware/auth/requireAuth');
const mongoose = require('mongoose');

const Cashbox = mongoose.model('Cashbox');

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
      fundTotal,
      _user: req.user.id
    });

    try {
      await cashbox.save();

      res.redirect('/api/cashboxes');
    } catch (err) {
      res.status(422).send(err);
    }
  });
};
