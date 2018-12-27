const mongoose = require('mongoose');

const pokemonSchema = new mongoose.Schema({
  id: Number,
  name: String,
  height: String
});

module.exports = mongoose.model('Pokemon', pokemonSchema);