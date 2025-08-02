// src/components/Footer.js
import React from 'react';

const Footer = () => {
  const year = new Date().getFullYear();
  
  return (
    <footer className="footer">
      <div className="container">
        <p>© {year} Smart Recipe Recommendation Engine. Powered by Spoonacular API.</p>
      </div>
    </footer>
  );
};

export default Footer;