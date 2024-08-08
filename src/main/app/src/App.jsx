import React from 'react'
import Nav from './Components/Navbar/Navbar.jsx'
import Header from './Components/Header/Header.jsx'
import Description from './Components/Description/Description.jsx'
import Title from './Components/Title/Title.jsx'
import Fonction from './Components/Fonction/Fonction.jsx'
import About from './Components/About/About.jsx'
import Footer from './Components/Footer/Footer.jsx'

const App = () => {
  return (
      <div>
      <Nav />
      <Header />
      <Description />
      <Title title="Principales Fonctionnalités" />
      <Fonction />
      <Title title="À Propos De Nous" />
      <About />
      <Footer />
      </div>
  )
}

export default App