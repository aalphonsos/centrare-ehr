const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: String,
  password: String,
  user_type: {
      type: String,
      enum: ['administrative','doctor','patient','lab-technician']
  }
});

module.exports = mongoose.model('User', UserSchema);