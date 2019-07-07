const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    match: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  },
  password: { type: String, required: true }
});

userSchema.pre('save', async function(next) {
  console.log(this);
  const hash = await bcrypt.hash(this.password, 10);
  this.password = hash;
  console.log(this);
  next();
});

module.exports = mongoose.model('User', userSchema);
