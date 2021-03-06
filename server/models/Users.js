  const mongoose = require('mongoose')
  const userSchema = new mongoose({
    name:{
      type: String,
      required:true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true
    },
    role: {
      type: String,
      default: "customer"
    },
    date: {
      type: Date,
      default: Date.now()
    },
  });

  const User = mongoose.model("User", userSchema);

  module.exports = User;