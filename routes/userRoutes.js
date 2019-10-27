const express = require('express');
const router = express.Router();
const passport = require('passport');
const passportService = require('../services/passport');
const hashPassword = require('../middleware/hashPassword');
const Authentication = require('../controllers/authentication');
const requireAuth = require('../middleware/auth/requireAuth');

router.get('', (req, res) => {
  console.log('GET to /api/users');
  return res.send({ greeting: '/users' });
});

router.post('/signup', hashPassword, Authentication.signup, () => {
  console.log('POST to /api/users/signup');
});

router.post('/signin', (req, res, next) => {
  console.log('POST to /api/users/signin');
  passport.authenticate('local', {
    successRedirect: '/api/users/current_user',
    failureRedirect: '/api/users/current_user'
  })(req, res, next);
});

router.get('/current_user', requireAuth, (req, res) => {
  console.log('GET to /api/users/current_user');
  res.send(req.user);
});

router.get('/logout', requireAuth, (req, res) => {
  console.log('GET to /api/users/logout');
  req.logout();
  res.redirect('/');
});

router.get(
  '/google',
  passport.authenticate('google', {
    scope: ['profile', 'email']
  })
);

router.get(
  '/google/callback',
  passport.authenticate('google', {
    successRedirect: '/cashboxes',
    failureRedirect: '/api/users/signin'
  })
);

module.exports = router;
