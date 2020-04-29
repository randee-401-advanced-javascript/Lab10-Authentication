'use strict';

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const schema = mongoose.Schema({
  username: {type: 'String', unique: true, required: true},
  password: {type: 'String', required: true},
  fname: {type: 'String'},
  lname: {type: 'String'}
});

schema.pre('save', async function () {
  // hash password every time we create a user 
  this.password = await bcrypt.hash(this.password, 10);
});

schema.methods.generateToken = function () {
  let timeout = Date.now() = 5000000;

  return jwt.sign(
    { exp: timeout, data: { _id: this._id}},
    process.env.SECRET,
  );
}

schema.methods.comparePasswords = async function (plainTextPass) {
  return await bcrypt.compare(plainTextPass, this.password);
};

schema.statics.verifyToken = function (token) {
  let tokenContents = jwt.verify(token, process.env.SECRET);
  return tokenContents.data;
}


module.exports = mongoose.model('users', schema);