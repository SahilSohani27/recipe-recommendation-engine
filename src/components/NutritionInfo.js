// src/components/NutritionInfo.js
import React from 'react';

const NutritionInfo = ({ nutrition }) => {
  if (!nutrition) return null;
  
  // Extract key nutrients
  const nutrients = nutrition.nutrients || [];
  
  const findNutrient = (name) => {
    return nutrients.find(nutrient => nutrient.name === name) || { amount: 0, unit: 'g' };
  };
  
  const calories = findNutrient('Calories');
  const protein = findNutrient('Protein');
  const fat = findNutrient('Fat');
  const carbs = findNutrient('Carbohydrates');
  const fiber = findNutrient('Fiber');
  const sugar = findNutrient('Sugar');
  
  return (
    <div className="nutrition-info">
      <h3>Nutritional Information</h3>
      <div className="nutrition-grid">
        <div className="nutrient-item">
          <div className="nutrient-value">{Math.round(calories.amount)}</div>
          <div className="nutrient-label">Calories</div>
        </div>
        
        <div className="nutrient-item">
          <div className="nutrient-value">{Math.round(protein.amount)}{protein.unit}</div>
          <div className="nutrient-label">Protein</div>
        </div>
        
        <div className="nutrient-item">
          <div className="nutrient-value">{Math.round(fat.amount)}{fat.unit}</div>
          <div className="nutrient-label">Fat</div>
        </div>
        
        <div className="nutrient-item">
          <div className="nutrient-value">{Math.round(carbs.amount)}{carbs.unit}</div>
          <div className="nutrient-label">Carbs</div>
        </div>
        
        <div className="nutrient-item">
          <div className="nutrient-value">{Math.round(fiber.amount)}{fiber.unit}</div>
          <div className="nutrient-label">Fiber</div>
        </div>
        
        <div className="nutrient-item">
          <div className="nutrient-value">{Math.round(sugar.amount)}{sugar.unit}</div>
          <div className="nutrient-label">Sugar</div>
        </div>
      </div>
      
      {nutrition.diets && nutrition.diets.length > 0 && (
        <div className="diet-tags">
          <h4>Suitable for:</h4>
          <div className="tags-container">
            {nutrition.diets.map((diet, index) => (
              <span key={index} className="diet-tag">{diet}</span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default NutritionInfo;