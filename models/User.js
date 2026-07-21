const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
  },
  fullName:{
    type: String,
  },
  phoneNumber:{
    type: Number,
  },
  dealerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Dealer'
  }
}, {timestamps: true});

const User = mongoose.models.User || mongoose.model('User', userSchema);


module.exports = User;
