const requireAuth = require('../middleware/auth/requireAuth');

module.exports = app => {
  app.get('/api/cashboxes/:id/transactions', requireAuth, (req, res) => {
    return res.send({ greeting: `transactions for cashbox ${req.params.id}` });
  });
};
