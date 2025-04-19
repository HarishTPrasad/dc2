const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  userid: {
    type: String,
    unique: true
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  fullname: {
    type: String,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String
  }
}, {
  timestamps: true 
});

module.exports = mongoose.model('User', UserSchema);
