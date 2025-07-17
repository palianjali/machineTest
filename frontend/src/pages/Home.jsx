import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

// Static default recipes
const initialRecipes = [
  {
    title: 'Spaghetti Bolognese',
    ingredients: ['Spaghetti', 'Ground Beef', 'Tomato Sauce', 'Onion', 'Garlic'],
    imageUrl: 'https://supervalu.ie/thumbnail/800x600/var/files/real-food/recipes/Uploaded-2020/spaghetti-bolognese-recipe.jpg',
  },
  {
    title: 'Vegetable Stir Fry',
    ingredients: ['Broccoli', 'Carrot', 'Bell Pepper', 'Soy Sauce', 'Ginger'],
    imageUrl: 'https://s.lightorangebean.com/media/20240914144639/Thai-Vegetable-Stir-Fry-with-Lime-and-Ginger_done.png',
  },
  {
    title: 'Chicken Tikka Masala',
    ingredients: ['Chicken', 'Yogurt', 'Tomato Puree', 'Spices', 'Cream'],
    imageUrl: 'https://www.indianhealthyrecipes.com/wp-content/uploads/2022/06/chicken-tikka-masala.jpg',
  },
  {
    title: 'Pancakes',
    ingredients: ['Flour', 'Milk', 'Eggs', 'Baking Powder', 'Sugar'],
    imageUrl: 'https://static.toiimg.com/thumb/53109843.cms?imgsize=275356&width=800&height=800',
  },
];

const Home = () => {
  const [form, setForm] = useState({
    title: '',
    ingredients: '',
    steps: '',
    imageUrl: '',
  });

  // Handle form input
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // Submit recipe
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { title, ingredients, steps, imageUrl } = form;

    if (!title || !ingredients || !imageUrl) {
      return alert('Title, ingredients, and image URL are required');
    }

    const token = localStorage.getItem('token');
    if (!token) {
      return alert('You must be logged in to add a recipe.');
    }

    try {
      await axios.post(
        'http://localhost:5000/api/recipes',
        {
          title,
          ingredients: ingredients.split(',').map(item => item.trim()),
          steps: steps ? steps.split('.').map(s => s.trim()).filter(Boolean) : [],
          imageUrl,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert('✅ Recipe added successfully! Go to "My Recipe" to view it.');
      setForm({ title: '', ingredients: '', steps: '', imageUrl: '' });
    } catch (err) {
      console.error('Error adding recipe:', err);
      alert('❌ Failed to add recipe. Please make sure you are logged in.');
    }
  };

  return (
    <div>
      {/* Navbar */}
      <div className='bg-gray-400 h-20 flex items-center justify-center gap-10 text-white font-bold text-2xl'>
        <img
          src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdowOPjag-hQKDHQXhyue9wzFdZ9H1hLW09Q&s'
          alt='logo'
          className='w-13 h-13 rounded-full'
        />
        <span>Home</span>
        <span>About</span>
        <Link to='/recipe'>
          <span>My Recipe</span>
        </Link>
      </div>

      {/* Title */}
      <div className='text-center mt-10'>
        <h1 className='text-3xl font-bold mb-5'>All Recipes</h1>
      </div>

      {/* Add Recipe Form */}
      <div className='max-w-xl mx-auto bg-white shadow-md rounded-xl p-6 mb-10'>
        <h2 className='text-xl font-semibold mb-4 text-center'>Add a New Recipe</h2>
        <form onSubmit={handleSubmit} className='space-y-4'>
          <input
            type='text'
            name='title'
            value={form.title}
            onChange={handleChange}
            placeholder='Recipe Title'
            className='w-full border border-gray-300 rounded-md p-2'
          />
          <input
            type='text'
            name='ingredients'
            value={form.ingredients}
            onChange={handleChange}
            placeholder='Ingredients (comma separated)'
            className='w-full border border-gray-300 rounded-md p-2'
          />
          <input
            type='text'
            name='steps'
            value={form.steps}
            onChange={handleChange}
            placeholder='Steps (separated by periods)'
            className='w-full border border-gray-300 rounded-md p-2'
          />
          <input
            type='text'
            name='imageUrl'
            value={form.imageUrl}
            onChange={handleChange}
            placeholder='Image URL'
            className='w-full border border-gray-300 rounded-md p-2'
          />
          <button
            type='submit'
            className='bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md w-full'
          >
            Add Recipe
          </button>
        </form>
      </div>

      {/* Static Initial Recipes Only */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 px-10 pb-10 mt-2 m-40'>
        {initialRecipes.map((recipe, index) => (
          <div
            key={index}
            className='bg-white shadow-lg rounded-xl overflow-hidden border border-gray-200'
          >
            <img src={recipe.imageUrl} alt={recipe.title} className='w-full h-56 object-cover' />
            <div className='p-4'>
              <h2 className='text-xl font-semibold mb-2'>{recipe.title}</h2>
              <p className='font-medium'>Ingredients:</p>
              <ul className='list-disc list-inside text-sm text-gray-700'>
                {recipe.ingredients.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
