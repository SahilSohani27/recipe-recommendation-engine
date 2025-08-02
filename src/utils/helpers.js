/**
 * Utility functions for the recipe application
 */

/**
 * Format a date string to a more readable format
 * @param {string} dateString - ISO date string
 * @returns {string} Formatted date string
 */
export const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  /**
   * Format cooking time to a readable format
   * @param {number} minutes - Time in minutes
   * @returns {string} Formatted time string
   */
  export const formatCookingTime = (minutes) => {
    if (minutes < 60) {
      return `${minutes} min`;
    }
    
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    
    if (remainingMinutes === 0) {
      return `${hours} hr`;
    }
    
    return `${hours} hr ${remainingMinutes} min`;
  };
  
  /**
   * Truncate text to a specific length and add ellipsis
   * @param {string} text - Text to truncate
   * @param {number} length - Maximum length
   * @returns {string} Truncated text
   */
  export const truncateText = (text, length = 100) => {
    if (!text || text.length <= length) return text;
    return text.slice(0, length) + '...';
  };
  
  /**
   * Filter recipes based on ingredients and dietary preferences
   * @param {Array} recipes - Array of recipe objects
   * @param {Array} ingredients - Array of ingredient strings
   * @param {Object} dietaryFilters - Object with dietary filter flags
   * @returns {Array} Filtered recipes
   */
  export const filterRecipes = (recipes, ingredients, dietaryFilters) => {
    if (!recipes || !Array.isArray(recipes)) return [];
    
    return recipes.filter(recipe => {
      // Filter by ingredients if there are any
      if (ingredients && ingredients.length > 0) {
        // Check if at least one of the user's ingredients is in the recipe
        const hasIngredient = recipe.ingredients.some(recipeIngredient => 
          ingredients.some(userIngredient => 
            recipeIngredient.toLowerCase().includes(userIngredient.toLowerCase())
          )
        );
        
        if (!hasIngredient) return false;
      }
      
      // Filter by dietary preferences
      if (dietaryFilters) {
        if (dietaryFilters.vegetarian && !recipe.isVegetarian) return false;
        if (dietaryFilters.vegan && !recipe.isVegan) return false;
        if (dietaryFilters.glutenFree && !recipe.isGlutenFree) return false;
        if (dietaryFilters.dairyFree && !recipe.isDairyFree) return false;
      }
      
      return true;
    });
  };
  
  /**
   * Calculate average rating from ratings array
   * @param {Array} ratings - Array of rating objects
   * @returns {number} Average rating
   */
  export const calculateAverageRating = (ratings) => {
    if (!ratings || !ratings.length) return 0;
    
    const sum = ratings.reduce((total, rating) => total + rating.value, 0);
    return (sum / ratings.length).toFixed(1);
  };
  
  /**
   * Parse URL parameters
   * @returns {Object} Object containing URL parameters
   */
  export const getUrlParams = () => {
    const params = {};
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    
    for (const [key, value] of urlParams.entries()) {
      params[key] = value;
    }
    
    return params;
  };
  
  /**
   * Debounce function to limit how often a function is called
   * @param {Function} func - Function to debounce
   * @param {number} wait - Wait time in milliseconds
   * @returns {Function} Debounced function
   */
  export const debounce = (func, wait = 300) => {
    let timeout;
    
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  };
  
  /**
   * Generate a unique ID
   * @returns {string} Unique ID
   */
  export const generateId = () => {
    return Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
  };
  
  /**
   * Storage helper to persist data to localStorage
   */
  export const storage = {
    get: (key, defaultValue = null) => {
      try {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : defaultValue;
      } catch (error) {
        console.error('Error getting item from localStorage:', error);
        return defaultValue;
      }
    },
    
    set: (key, value) => {
      try {
        localStorage.setItem(key, JSON.stringify(value));
      } catch (error) {
        console.error('Error setting item in localStorage:', error);
      }
    },
    
    remove: (key) => {
      try {
        localStorage.removeItem(key);
      } catch (error) {
        console.error('Error removing item from localStorage:', error);
      }
    }
  };

// Make sure helpers.js has these exports
export const getFromLocalStorage = (key, defaultValue = null) => {
  try {
    const serializedValue = localStorage.getItem(key);
    if (serializedValue === null) {
      return defaultValue;
    }
    return JSON.parse(serializedValue);
  } catch (error) {
    console.error(`Error retrieving from localStorage with key "${key}":`, error);
    return defaultValue;
  }
};

export const saveToLocalStorage = (key, value) => {
  try {
    const serializedValue = JSON.stringify(value);
    localStorage.setItem(key, serializedValue);
  } catch (error) {
    console.error(`Error saving to localStorage with key "${key}":`, error);
  }
};