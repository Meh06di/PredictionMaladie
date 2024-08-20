import React from 'react';
import './Header.css';
import TypeWriter from '../TypeWriter/TypeWriter';

const Header = () => {
    return (
        <div className='header'>
            <div className="hero-text">
                <h1>Dr Vito : Prédiction et Prévention des Maladies</h1>
                <div className="typewriter-container">
                    <TypeWriter
                        text="Dialoguez en temps réel avec notre médecin robot pour anticiper et comprendre vos symptômes."
                        fontSize="20px"
                        duration="6s"
                    />
                </div>
            </div>
        </div>
    );
};

export default Header;
