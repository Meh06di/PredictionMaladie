import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className='footer'>
      <div className='footer-content'>
        <div className='footer-section'>
          <h4>À propos de Dr Vito</h4>
          <br />
          <p>Dr Vito est un outil innovant de prédiction et de prévention des maladies. Nous utilisons des algorithmes avancés et des analyses de données pour vous fournir des évaluations personnalisées.</p>
        </div>
        <div className='footer-section'>
          <h4>Contact</h4>
          <br />
          <p>Adresse : 123 Rue de la Santé, Casablanca, Maroc</p>
          <p>Téléphone : +212 621740209</p>
          <p>Email : contact@drvito.com</p>
        </div>
        <div className='footer-section'>
          <h4>Suivez-nous</h4>
          <br />
          <a href="https://facebook.com/drvito" target="_blank" rel="noopener noreferrer">Facebook</a>
          <a href="https://twitter.com/drvito" target="_blank" rel="noopener noreferrer">Twitter</a>
          <a href="https://linkedin.com/company/drvito" target="_blank" rel="noopener noreferrer">LinkedIn</a>
        </div>
      </div>
      <div className='footer-bottom'>
        <p>&copy; 2024 Dr Vito. Tous droits réservés.</p>
      </div>
    </footer>
  );
};

export default Footer;
