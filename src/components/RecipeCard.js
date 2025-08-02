// src/components/RecipeCard.js
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { PreferenceContext } from '../context/PreferenceContext';

const RecipeCard = ({ recipe }) => {
  const { isFavorite, toggleFavoriteRecipe } = useContext(PreferenceContext);
  const favorite = isFavorite(recipe.id);

  return (
    <div className="recipe-card">
      <div className="recipe-image">
        <img src={recipe.image} alt={recipe.title} />
        <button 
          className={`favorite-button ${favorite ? 'favorite' : ''}`}
          onClick={() => toggleFavoriteRecipe(recipe)}
        >
          {favorite ? '❤️' : '🤍'}
        </button>
      </div>
      
      <div className="recipe-info">
        <h3 className="recipe-title">{recipe.title}</h3>
        
        <div className="recipe-stats">
          <span>Ready in {recipe.readyInMinutes} minutes</span>
          {recipe.missedIngredientCount > 0 && (
            <span>Missing {recipe.missedIngredientCount} ingredients</span>
          )}
        </div>
        
        <div className="recipe-used-ingredients">
          <h4>Ingredients you have:</h4>
          <ul>
            {recipe.usedIngredients && recipe.usedIngredients.map((ingredient, index) => (
              <li key={index}>{ingredient.name}</li>
            ))}
          </ul>
        </div>
        
        {recipe.missedIngredients && recipe.missedIngredients.length > 0 && (
          <div className="recipe-missing-ingredients">
            <h4>You'll need to get:</h4>
            <ul>
              {recipe.missedIngredients.map((ingredient, index) => (
                <li key={index}>{ingredient.name}</li>
              ))}
            </ul>
          </div>
        )}
        
        <Link to={`/recipe/${recipe.id}`} className="view-recipe-button">
          View Full Recipe
        </Link>
      </div>
    </div>
  );
};

export default RecipeCard;