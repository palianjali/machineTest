import { useState } from 'react';
import axios from 'axios';

const AddRecipe = () => {
  const [form, setForm] = useState({
    title: '',
    ingredients: '',
    steps: '',
    image: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  const token = localStorage.getItem('token');
  console.log("JWT Token:", token);

  if (!token) {
    alert("You must be logged in to add a recipe.");
    return;
  }

  try {
    await axios.post('http://localhost:5000/api/recipes',
      {
        ...form,
        ingredients: form.ingredients.split(',').map(item => item.trim())
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    alert('Recipe added!');
    setForm({ title: '', ingredients: '', steps: '', image: '' });
  } catch (err) {
    console.error('Error adding recipe:', err.response?.data || err.message);
    alert(err.response?.data?.error || 'Error adding recipe');
  }
};

  return (
    <form onSubmit={handleSubmit} className="p-6 max-w-xl mx-auto space-y-4">
      <input name="title" value={form.title} onChange={handleChange} placeholder="Title" required className="w-full p-2 border rounded" />
      <input name="ingredients" value={form.ingredients} onChange={handleChange} placeholder="Ingredients (comma-separated)" required className="w-full p-2 border rounded" />
      <textarea name="steps" value={form.steps} onChange={handleChange} placeholder="Steps" required className="w-full p-2 border rounded" />
      <input name="image" value={form.image} onChange={handleChange} placeholder="Image URL" required className="w-full p-2 border rounded" />
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Add Recipe</button>
    </form>
  );
};

export default AddRecipe;
