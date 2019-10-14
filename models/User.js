const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
  googleId: String,
  email: String,
  password: String,
  dateRegistered: {
    type: Date,
    default: Date.now
  },
  cashboxes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Cashbox'
    }
  ],
  resetPasswordToken: String,
  resetPasswordExpires: Date
});

mongoose.model('User', UserSchema);
