
import React from 'react';
import './Nav.css';
import logo from '../../assets/dr robot.png';

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="navbar-container">
                <img src={logo} alt="logo" className="navbar-logo" />
                <h1 className="navbar-title">Disease Prediction</h1>
            </div>
        </nav>
    );
};

export default Navbar;
