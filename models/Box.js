const mongoose = require('mongoose');
const { Schema } = mongoose;

const BoxSchema = new Schema({
  twenties: {
    type: Number,
    min: 0
  },
  tens: {
    type: Number,
    min: 0
  },
  fives: {
    type: Number,
    min: 0
  },
  ones: {
    type: Number,
    min: 0
  },
  qrolls: {
    type: Number,
    min: 0
  },
  drolls: {
    type: Number,
    min: 0
  },
  nrolls: {
    type: Number,
    min: 0
  },
  prolls: {
    type: Number,
    min: 0
  },
  quarters: {
    type: Number,
    min: 0
  },
  dimes: {
    type: Number,
    min: 0
  },
  nickels: {
    type: Number,
    min: 0
  },
  pennies: {
    type: Number,
    min: 0
  },
  boxTotal: {
    type: Number,
    default: function() {
      return (
        this.twenties * 20 +
        this.tens * 10 +
        this.fives * 5 +
        this.ones +
        this.qrolls * 10 +
        this.drolls * 5 +
        this.nrolls * 2 +
        this.prolls * 0.5 +
        this.quarters * 0.25 +
        this.dimes * 0.1 +
        this.nickels * 0.05 +
        this.pennies * 0.01
      );
    }
  },
  _cashbox: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Cashbox'
  }
});

mongoose.model('Box', BoxSchema);
