const mongoose = require('mongoose');

const Cashbox = mongoose.model('Cashbox');

module.exports = async (req, res, next) => {
  const cashbox = await Cashbox.findById(req.params.id);

  console.log(`cashbox._user = ${cashbox._user}`);
  console.log(`userId = ${req.user._id}`);

  if (cashbox._user.equals(req.user._id)) {
    return next();
  }

  return res.status(401).send('Unauthorized');
};
