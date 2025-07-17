const express = require('express');
const router = express.Router();
const Recipe = require('../models/Recipe');
const auth = require('../middleware/authMiddleware');

// GET all public recipes
router.get('/', async (req, res) => {
  try {
    const recipes = await Recipe.find().populate('user_id', 'name');
    res.json(recipes);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// POST a new recipe (auth required)
router.post('/', auth, async (req, res) => {
  const { title, ingredients, steps, image } = req.body;

  try {
    const recipe = new Recipe({
      title,
      ingredients,
      steps,
      image,
      user_id: req.userId
    });
    await recipe.save();
    res.status(201).json(recipe);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// GET recipes by logged-in user
router.get('/my-recipes', auth, async (req, res) => {
  try {
    const recipes = await Recipe.find({ user_id: req.userId });
    res.json(recipes);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
