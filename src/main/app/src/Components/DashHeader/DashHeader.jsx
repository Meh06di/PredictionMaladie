import React from 'react';
import './DashHeader.css'

const Header = () => {
    return (
        <header>
            <h1>Bienvenue dans le Tableau de Bord</h1>
            <nav>
                <ul>
                    <li><a href="/profile">Profil</a></li>
                    <li><a href="/history">Historique des Symptômes</a></li>
                    <li><a href="/recommendations">Recommandations</a></li>
                    <li><a href="/logout">Déconnexion</a></li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;