// comment.js
const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  nom: {
    type: String,
    required: true
  },
  commentaire: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
