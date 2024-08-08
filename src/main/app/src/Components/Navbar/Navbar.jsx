import React, {useEffect, useState} from 'react'
import './Navbar.css'
import logo from '../../assets/dr robot.png'

const Navbar = () => {
  const [sticky, setSticky] = useState(false);
  useEffect(()=>{
    window.addEventListener('scroll',()=>{
      window.scrollY > 500 ? setSticky(true) : setSticky(false)
    },[])
  })
  return (
    <nav className={`container ${sticky? 'dark-nav' : ''}`}>
      <img src={logo} alt="logo" className='logo' />
      <ul>
        <li>Home</li>
        <li>About us</li>
        <li>Contact us</li>
        <li>Login</li>
        <li><button className='btn'>Sign up</button></li>
      </ul>
    </nav>
  )
}

export default Navbar