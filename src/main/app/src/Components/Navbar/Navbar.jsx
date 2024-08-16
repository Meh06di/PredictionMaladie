import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import logo from '../../assets/dr robot.png';

const Navbar = () => {
  const [sticky, setSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setSticky(window.scrollY > 500);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
      <nav className={`container ${sticky ? 'dark-nav' : ''}`}>
        <img src={logo} alt="logo" className='logo' />
        <ul>
          <li><a href="#home">Home</a></li>
          <li><a href="#about">About us</a></li>
          <li><a href="#contact">Contact us</a></li>
          <li><Link to="/users/login">Login</Link></li>
          <li>
            <button className='btn'><Link to="/users/signUp">Sign up</Link></button>
          </li>
        </ul>
      </nav>
  );
};

export default Navbar;