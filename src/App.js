import React from 'react';
import { Routes, Route } from 'react-router-dom';  // Remove BrowserRouter from here
import { PreferenceProvider } from './context/PreferenceContext';
import Header from './components/Header';
import Footer from './components/Footer';
import IngredientInput from './components/IngredientInput';
import DietaryFilter from './components/DietaryFilter';
import RecipeList from './components/RecipeList';
import RecipeDetail from './components/RecipeDetail';
import './App.css';

const Home = () => {
  return (
    <div className="home-page">
      <div className="sidebar">
        <IngredientInput />
        <DietaryFilter />
      </div>
      <div className="main-content">
        <RecipeList />
      </div>
    </div>
  );
};

const Favorites = () => {
  return (
    <div className="favorites-page">
      <h1>Your Favorite Recipes</h1>
      {/* A component to display favorite recipes - not shown in this code */}
    </div>
  );
};

const Preferences = () => {
  return (
    <div className="preferences-page">
      <h1>Your Preferences</h1>
      <DietaryFilter />
    </div>
  );
};

const App = () => {
  return (
    <PreferenceProvider>
      <div className="app">
        <Header />
        <main className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/recipe/:recipeId" element={<RecipeDetail />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/preferences" element={<Preferences />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </PreferenceProvider>
  );
};

export default App;
