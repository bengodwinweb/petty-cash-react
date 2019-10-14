const Authentication = require('../controllers/authentication');
const hashPassword = require('../middleware/hashPassword');
const passportService = require('../services/passport');
const passport = require('passport');

const requireAuth = require('../middleware/auth/requireAuth');

module.exports = app => {
  app.get('/api/users', (req, res) => {
    return res.send({ greeting: '/users' });
  });

  app.post('/api/users/signup', hashPassword, Authentication.signup);

  app.post('/api/users/signin', (req, res, next) => {
    passport.authenticate('local', {
      successRedirect: '/api/users/current_user',
      failureRedirect: '/api/users/current_user'
    })(req, res, next);
  });

  app.get('/api/users/signin', (req, res, next) => {
    res.send({ message: 'please sign in' });
  });

  app.get('/api/users/current_user', (req, res) => {
    res.send(req.user);
  });

  app.get('/api/users/logout', (req, res) => {
    req.logout();
    res.redirect('/');
  });

  app.get(
    '/api/users/google',
    passport.authenticate('google', {
      scope: ['profile', 'email']
    })
  );

  app.get(
    '/api/users/google/callback',
    passport.authenticate('google', {
      successRedirect: '/cashboxes',
      failureRedirect: '/api/users/signin'
    })
  );
};
