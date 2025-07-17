const mongoose = require('mongoose');

const RecipeSchema = new mongoose.Schema({
  title: String,
  ingredients: [String],
  steps: String,
  image: String,
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
});

module.exports = mongoose.model('Recipe', RecipeSchema);
