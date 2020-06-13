const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
    minlength: 1,
  },
  text: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 200,
  },
  date: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

module.exports = mongoose.model('post', postSchema);
