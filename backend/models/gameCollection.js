const mongoose = require('mongoose');

const GameCollection = mongoose.model('GameCollection', {
  collectionTitle: String,
  questions: { type: Array, default: [] }
})

module.exports = GameCollection;
