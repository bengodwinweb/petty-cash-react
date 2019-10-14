const requireAuth = require('../middleware/auth/requireAuth');

module.exports = app => {
  app.get('/api/cashboxes', requireAuth, (req, res) => {
    return res.send({ greeting: 'cashboxes here!' });
  });
};
