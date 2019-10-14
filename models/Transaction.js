const mongoose = require('mongoose');
const { Schema } = mongoose;

const TransactionSchema = new Schema({
  paidTo: {
    type: String,
    required: true
  },
  expenseType: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    min: 0.01
  },
  index: {
    type: String,
    required: true
  },
  account: {
    type: String,
    required: true
  },
  description: String,
  _cashbox: String
});

mongoose.model('Transaction', TransactionSchema);
