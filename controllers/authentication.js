const keys = require('../config/keys');
const mongoose = require('mongoose');

const User = mongoose.model('User');

exports.signup = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(422)
      .send({ error: 'You must provide an email and password' });
  }

  // See if a user with a given email exists
  User.findOne({ email: email }, (err, existingUser) => {
    if (err) {
      return next(err);
    }

    if (existingUser) {
      return res.status(422).send({ error: 'Email is already registered' });
    }

    const newUser = new User({
      email,
      password
    });
    newUser
      .save()
      .then(res.send(newUser))
      .catch(err => console.log(err));
  });
};
