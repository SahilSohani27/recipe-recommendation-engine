// src/components/DietaryFilter.js
import React, { useContext } from 'react';
import { PreferenceContext } from '../context/PreferenceContext';

const DietaryFilter = () => {
  const { dietaryPreferences, updateDietaryPreferences } = useContext(PreferenceContext);

  const diets = [
    "Gluten Free", 
    "Ketogenic", 
    "Vegetarian", 
    "Lacto-Vegetarian", 
    "Ovo-Vegetarian", 
    "Vegan", 
    "Pescetarian", 
    "Paleo", 
    "Primal", 
    "Whole30"
  ];

  const intolerances = [
    "Dairy", 
    "Egg", 
    "Gluten", 
    "Grain", 
    "Peanut", 
    "Seafood", 
    "Sesame", 
    "Shellfish", 
    "Soy", 
    "Sulfite", 
    "Tree Nut", 
    "Wheat"
  ];

  const handleDietChange = (diet) => {
    const updatedDiets = dietaryPreferences.diets.includes(diet)
      ? dietaryPreferences.diets.filter(d => d !== diet)
      : [...dietaryPreferences.diets, diet];
    
    updateDietaryPreferences({ diets: updatedDiets });
  };

  const handleIntoleranceChange = (intolerance) => {
    const updatedIntolerances = dietaryPreferences.intolerances.includes(intolerance)
      ? dietaryPreferences.intolerances.filter(i => i !== intolerance)
      : [...dietaryPreferences.intolerances, intolerance];
    
    updateDietaryPreferences({ intolerances: updatedIntolerances });
  };

  const handleReadyTimeChange = (e) => {
    updateDietaryPreferences({ maxReadyTime: Number(e.target.value) });
  };

  return (
    <div className="dietary-filter">
      <h2>Dietary Preferences</h2>
      
      <div className="filter-section">
        <h3>Diet Types</h3>
        <div className="checkbox-group">
          {diets.map((diet, index) => (
            <label key={index} className="checkbox-label">
              <input
                type="checkbox"
                checked={dietaryPreferences.diets.includes(diet)}
                onChange={() => handleDietChange(diet)}
              />
              {diet}
            </label>
          ))}
        </div>
      </div>
      
      <div className="filter-section">
        <h3>Intolerances</h3>
        <div className="checkbox-group">
          {intolerances.map((intolerance, index) => (
            <label key={index} className="checkbox-label">
              <input
                type="checkbox"
                checked={dietaryPreferences.intolerances.includes(intolerance)}
                onChange={() => handleIntoleranceChange(intolerance)}
              />
              {intolerance}
            </label>
          ))}
        </div>
      </div>
      
      <div className="filter-section">
        <h3>Max Preparation Time: {dietaryPreferences.maxReadyTime} minutes</h3>
        <input
          type="range"
          min="10"
          max="120"
          step="5"
          value={dietaryPreferences.maxReadyTime}
          onChange={handleReadyTimeChange}
          className="slider"
        />
        <div className="slider-labels">
          <span>10 min</span>
          <span>120 min</span>
        </div>
      </div>
    </div>
  );
};

export default DietaryFilter;