import React from 'react'

const RecipeCard = ({ recipe }) => {
  return (
    <div className="border rounded-lg p-4 shadow-md bg-white w-80">
      <img src={recipe.image} alt={recipe.title} className="h-40 w-full object-cover rounded" />
      <h2 className="text-xl font-bold mt-2">{recipe.title}</h2>
      <p className="text-sm text-gray-700 mt-1">
        Ingredients: {recipe.ingredients.join(', ')}
      </p>
    </div>
  );
};


export default RecipeCard
