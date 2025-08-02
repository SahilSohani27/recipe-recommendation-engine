import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import App from './App';
import { PreferenceProvider } from './context/PreferenceContext';

// Create a root element for React to render into
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the app wrapped in BrowserRouter for routing and PreferenceProvider for state management
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <PreferenceProvider>
        <App />
      </PreferenceProvider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to measure performance, uncomment the following line
// import { reportWebVitals } from './reportWebVitals';
// reportWebVitals(console.log);

// If you want to implement service worker for offline capabilities, uncomment the following lines
// import * as serviceWorkerRegistration from './serviceWorkerRegistration';
// serviceWorkerRegistration.register();