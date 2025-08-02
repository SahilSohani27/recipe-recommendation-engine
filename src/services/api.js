import axios from 'axios';

// Replace with your actual API key
const API_KEY = 'fa97bd1fb250454dba98a5a167f21339';
const BASE_URL = 'https://api.spoonacular.com';

export const searchRecipesByIngredients = async (ingredients, number = 10) => {
  try {
    const response = await axios.get(`${BASE_URL}/recipes/findByIngredients`, {
      params: {
        ingredients: ingredients.join(','),
        number,
        ranking: 2, // maximize used ingredients
        apiKey: API_KEY,
        ignorePantry: true // ignore common ingredients like salt, oil
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching recipes by ingredients:', error);
    throw error;
  }
};

export const getRecipeInformation = async (recipeId) => {
  try {
    const response = await axios.get(`${BASE_URL}/recipes/${recipeId}/information`, {
      params: {
        apiKey: API_KEY,
        includeNutrition: true
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching recipe details:', error);
    throw error;
  }
};

export const getRecipesByDiet = async (ingredients, diet, intolerances, number = 10) => {
  try {
    const response = await axios.get(`${BASE_URL}/recipes/complexSearch`, {
      params: {
        includeIngredients: ingredients.join(','),
        diet: diet.join(','),
        intolerances: intolerances.join(','),
        number,
        addRecipeInformation: true,
        addRecipeNutrition: true,
        apiKey: API_KEY,
        fillIngredients: true,
        sort: 'max-used-ingredients'
      }
    });
    return response.data.results;
  } catch (error) {
    console.error('Error fetching recipes by diet:', error);
    throw error;
  }
};

// src/utils/helpers.js
export const saveToLocalStorage = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error('Error saving to localStorage:', error);
  }
};

export const getFromLocalStorage = (key, defaultValue) => {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : defaultValue;
  } catch (error) {
    console.error('Error retrieving from localStorage:', error);
    return defaultValue;
  }
};

export const calculateMissingIngredients = (recipeIngredients, userIngredients) => {
  const userIngredientsLower = userIngredients.map(ing => ing.toLowerCase());
  
  return recipeIngredients.filter(ingredient => {
    // Check if any user ingredient is part of this recipe ingredient
    return !userIngredientsLower.some(userIngredient => 
      ingredient.name.toLowerCase().includes(userIngredient)
    );
  });
};

