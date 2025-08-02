// src/components/IngredientInput.js
import React, { useState, useContext } from 'react';
import { PreferenceContext } from '../context/PreferenceContext';

const IngredientInput = () => {
  const [inputValue, setInputValue] = useState('');
  const { ingredients, addIngredient, removeIngredient } = useContext(PreferenceContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      addIngredient(inputValue.trim());
      setInputValue('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && inputValue.trim()) {
      addIngredient(inputValue.trim());
      setInputValue('');
    }
  };

  return (
    <div className="ingredient-input">
      <h2>Enter Your Available Ingredients</h2>
      <p>Add ingredients you already have at home to get recipe recommendations.</p>
      
      <div className="input-container">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Enter an ingredient (e.g., chicken, tomatoes, pasta)"
          className="ingredient-text-input"
        />
        <button onClick={handleSubmit} className="add-button">Add</button>
      </div>
      
      <div className="ingredients-list">
        <h3>Your Ingredients:</h3>
        {ingredients.length === 0 ? (
          <p className="empty-message">No ingredients added yet.</p>
        ) : (
          <ul>
            {ingredients.map((ingredient, index) => (
              <li key={index} className="ingredient-item">
                <span>{ingredient}</span>
                <button 
                  onClick={() => removeIngredient(ingredient)}
                  className="remove-button"
                >
                  ×
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default IngredientInput;