// src/context/PreferenceContext.js
import React, { createContext, useState, useEffect } from 'react';
import { getFromLocalStorage, saveToLocalStorage } from '../utils/helpers';

// Create the context
export const PreferenceContext = createContext();

// Create the provider component
export const PreferenceProvider = ({ children }) => {
  const [dietaryPreferences, setDietaryPreferences] = useState(
    getFromLocalStorage('dietaryPreferences', {
      diets: [],
      intolerances: [],
      maxReadyTime: 60,
      excludeIngredients: []
    })
  );
  
  const [ingredients, setIngredients] = useState(
    getFromLocalStorage('savedIngredients', [])
  );

  const [favoriteRecipes, setFavoriteRecipes] = useState(
    getFromLocalStorage('favoriteRecipes', [])
  );

  useEffect(() => {
    saveToLocalStorage('dietaryPreferences', dietaryPreferences);
  }, [dietaryPreferences]);

  useEffect(() => {
    saveToLocalStorage('savedIngredients', ingredients);
  }, [ingredients]);

  useEffect(() => {
    saveToLocalStorage('favoriteRecipes', favoriteRecipes);
  }, [favoriteRecipes]);

  const addIngredient = (ingredient) => {
    if (ingredient && !ingredients.includes(ingredient)) {
      setIngredients([...ingredients, ingredient]);
    }
  };

  const removeIngredient = (ingredient) => {
    setIngredients(ingredients.filter(i => i !== ingredient));
  };

  const updateDietaryPreferences = (newPreferences) => {
    setDietaryPreferences({ ...dietaryPreferences, ...newPreferences });
  };

  const toggleFavoriteRecipe = (recipe) => {
    const exists = favoriteRecipes.some(r => r.id === recipe.id);
    if (exists) {
      setFavoriteRecipes(favoriteRecipes.filter(r => r.id !== recipe.id));
    } else {
      setFavoriteRecipes([...favoriteRecipes, recipe]);
    }
  };

  const isFavorite = (recipeId) => {
    return favoriteRecipes.some(r => r.id === recipeId);
  };

  return (
    <PreferenceContext.Provider
      value={{
        dietaryPreferences,
        updateDietaryPreferences,
        ingredients,
        addIngredient,
        removeIngredient,
        favoriteRecipes,
        toggleFavoriteRecipe,
        isFavorite
      }}
    >
      {children}
    </PreferenceContext.Provider>
  );
};