const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const keys = require('../config/keys');

const User = mongoose.model('User');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});

// Google strategy
const googleOptions = {
  clientID: keys.googleClientID,
  clientSecret: keys.googleClientSecret,
  callbackURL: '/api/users/google/callback',
  proxy: true
};
const googleLogin = new GoogleStrategy(
  googleOptions,
  async (accessToken, refreshToken, profile, done) => {
    const existingUser = await User.findOne({ googleId: profile.id });

    if (existingUser) {
      return done(null, existingUser);
    }

    const newUser = await new User({
      googleId: profile.id,
      email: profile._json.email
    }).save();
    done(null, newUser);
  }
);

// Local strategy
const localOptions = { usernameField: 'email' };
const localLogin = new LocalStrategy(
  localOptions,
  async (email, password, done) => {
    const existingUser = await User.findOne({ email: email });

    if (!existingUser) {
      return done(null, false, {
        message: 'That email is not registered'
      });
    }

    bcrypt.compare(password, existingUser.password, (err, isMatch) => {
      if (err) throw err;

      if (isMatch) {
        return done(null, existingUser);
      }

      return done(null, false, { message: 'Password incorrect' });
    });
  }
);

passport.use(googleLogin);
passport.use(localLogin);
