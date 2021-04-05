'use strict';

const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  // key: { key: Value },
  // key: { key: Value }
  name: {type: String},
  description: {type: String},
  status: {type: String}
})

const userSchema = new mongoose.Schema({
  email: {type: String},
  books: [bookSchema]
})

const User = mongoose.model('BookUser', userSchema);

module.exports = User;