// src/components/RecipeDetail.js
import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getRecipeInformation } from '../services/api';
import { PreferenceContext } from '../context/PreferenceContext';
import NutritionInfo from './NutritionInfo';

const RecipeDetail = () => {
  const { recipeId } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { ingredients, isFavorite, toggleFavoriteRecipe } = useContext(PreferenceContext);

  useEffect(() => {
    const fetchRecipeDetails = async () => {
      setLoading(true);
      try {
        const data = await getRecipeInformation(recipeId);
        setRecipe(data);
      } catch (err) {
        setError('Failed to load recipe details. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipeDetails();
  }, [recipeId]);

  if (loading) {
    return <div className="loading">Loading recipe details...</div>;
  }

  if (error || !recipe) {
    return (
      <div className="error-container">
        <div className="error">{error || 'Recipe not found'}</div>
        <Link to="/" className="back-button">Back to Recipes</Link>
      </div>
    );
  }

  const favorite = isFavorite(recipe.id);

  return (
    <div className="recipe-detail">
      <div className="recipe-header">
        <Link to="/" className="back-button">← Back to Recipes</Link>
        <h1>{recipe.title}</h1>
        <div className="recipe-meta">
          <span>Ready in {recipe.readyInMinutes} minutes</span>
          <span>Servings: {recipe.servings}</span>
          <button 
            className={`favorite-button ${favorite ? 'favorite' : ''}`}
            onClick={() => toggleFavoriteRecipe(recipe)}
          >
            {favorite ? 'Remove from Favorites' : 'Add to Favorites'}
          </button>
        </div>
      </div>
      
      <div className="recipe-grid">
        <div className="recipe-image-container">
          <img src={recipe.image} alt={recipe.title} className="recipe-image" />
          
          {recipe.diets && recipe.diets.length > 0 && (
            <div className="recipe-tags">
              {recipe.diets.map((diet, index) => (
                <span key={index} className="tag">{diet}</span>
              ))}
            </div>
          )}
        </div>
        
        <div className="recipe-content">
          <NutritionInfo nutrition={recipe.nutrition} />
          
          <div className="recipe-ingredients">
            <h2>Ingredients</h2>
            <ul>
              {recipe.extendedIngredients.map((ingredient, index) => {
                const userHasIngredient = ingredients.some(ing => 
                  ingredient.name.toLowerCase().includes(ing.toLowerCase())
                );
                
                return (
                  <li 
                    key={index} 
                    className={userHasIngredient ? 'has-ingredient' : ''}
                  >
                    {ingredient.original}
                    {userHasIngredient && <span className="ingredient-check">✓</span>}
                  </li>
                );
              })}
            </ul>
          </div>
          
          <div className="recipe-instructions">
            <h2>Instructions</h2>
            {recipe.analyzedInstructions && recipe.analyzedInstructions.length > 0 ? (
              <ol>
                {recipe.analyzedInstructions[0].steps.map(step => (
                  <li key={step.number}>{step.step}</li>
                ))}
              </ol>
            ) : (
              <div 
                className="instructions-html" 
                dangerouslySetInnerHTML={{ __html: recipe.instructions }} 
              />
            )}
          </div>
        </div>
      </div>
      
      {recipe.sourceName && (
        <div className="recipe-source">
          <p>Source: {recipe.sourceName}</p>
          {recipe.sourceUrl && (
            <a href={recipe.sourceUrl} target="_blank" rel="noopener noreferrer">
              View Original Recipe
            </a>
          )}
        </div>
      )}
    </div>
  );
};

export default RecipeDetail;