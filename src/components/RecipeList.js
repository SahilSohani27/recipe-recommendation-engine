// src/components/RecipeList.js
import React, { useState, useEffect, useContext } from 'react';
import { PreferenceContext } from '../context/PreferenceContext';
import { searchRecipesByIngredients, getRecipesByDiet } from '../services/api';
import RecipeCard from './RecipeCard';

const RecipeList = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const { ingredients, dietaryPreferences } = useContext(PreferenceContext);

  useEffect(() => {
    const fetchRecipes = async () => {
      if (ingredients.length === 0) {
        setRecipes([]);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        let results;
        
        if (dietaryPreferences.diets.length > 0 || dietaryPreferences.intolerances.length > 0) {
          // Use complex search with dietary filters
          results = await getRecipesByDiet(
            ingredients,
            dietaryPreferences.diets,
            dietaryPreferences.intolerances
          );
        } else {
          // Just search by ingredients
          results = await searchRecipesByIngredients(ingredients);
        }
        
        setRecipes(results);
      } catch (err) {
        setError('Failed to fetch recipes. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, [ingredients, dietaryPreferences]);

  if (loading) {
    return <div className="loading">Loading recipes...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (ingredients.length === 0) {
    return (
      <div className="empty-state">
        <h2>Add ingredients to get started</h2>
        <p>Enter ingredients you have on hand, and we'll suggest recipes you can make.</p>
      </div>
    );
  }

  if (recipes.length === 0) {
    return (
      <div className="no-results">
        <h2>No recipes found</h2>
        <p>Try adding more ingredients or adjusting your dietary filters.</p>
      </div>
    );
  }

  return (
    <div className="recipe-list">
      <h2>Recipe Recommendations</h2>
      <p>Based on your {ingredients.length} ingredients and preferences</p>
      
      <div className="recipes-grid">
        {recipes.map(recipe => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </div>
    </div>
  );
};

export default RecipeList;