const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const keys = require('./config/keys');
require('./models/User');
require('./models/Cashbox');
require('./models/Box');
require('./models/Transaction');
require('./services/passport');

const app = express();

app.use(bodyParser.json());
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
);
app.use(passport.initialize());
app.use(passport.session());

// DB Setup
mongoose
  .connect(keys.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  })
  .then(() => {
    console.log('MongoDB Connected');
  })
  .catch(err => console.log(err));

// App Setup
app.use('/api', require('./routes/index'));
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/cashboxes', require('./routes/cashboxRoutes'));
app.use('/api/cashboxes/:id/box', require('./routes/boxRoutes'));
app.use(
  '/api/cashboxes/:id/transactions',
  require('./routes/transactionRoutes')
);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

// Server Setup
const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log('Server started on port ' + PORT));
