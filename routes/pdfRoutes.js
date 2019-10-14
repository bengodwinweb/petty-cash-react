const requireAuth = require('../middleware/auth/requireAuth');

module.exports = app => {
  app.get('/api/cashboxes/:id/pdf', requireAuth, (req, res) => {
    return res.send({ greeting: `pdf for cashbox ${req.params.id}` });
  });
};
