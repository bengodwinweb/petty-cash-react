const mongoose = require('mongoose');
const { Schema } = mongoose;

const CashboxSchema = new Schema({
  companyName: {
    type: String,
    default: 'Company Name'
  },
  cashboxName: {
    type: String,
    default: 'Department'
  },
  fundTotal: {
    type: Number,
    min: 0,
    default: 500
  },
  date: {
    type: Date,
    default: Date.now
  },
  transactions: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Transaction'
    }
  ],
  currentBox: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Box'
  },
  changeBox: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Box'
  },
  _user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
});

mongoose.model('Cashbox', CashboxSchema);
