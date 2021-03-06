const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postModel = new Schema({
  question: { type: String, required: true },
  voteCount: { type: Number, required: false }
});

module.exports = mongoose.model('Post', postModel, 'posts'); 