import React from 'react';
import './Header.css';
import arrow from '../../assets/dark-arrow.png';
import TypeWriter from '../TypeWriter/TypeWriter';

const Header = () => {
  return (
      <div className='header container'>
        <div className="hero-text">
          <h1>Dr Vito : Prédiction et Prévention des Maladies</h1>
          <p>
            <TypeWriter
                text="Dialoguez en temps réel avec notre médecin robot pour anticiper et comprendre vos symptômes."
                fontSize="30px"
                duration="6s"
            />
          </p>
        </div>
      </div>
  );
};

export default Header;
