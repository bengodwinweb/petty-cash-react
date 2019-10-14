if (process.env.NODE_ENV === 'production') {
  return (module.exports = require('./prod'));
}

module.exports = require('./dev');
