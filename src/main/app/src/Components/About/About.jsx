import React from 'react'
import './About.css'
import saad from '../../assets/saad.jpeg'
import mehdi from '../../assets/mehdi.jpeg'
import meryem from '../../assets/meryem.jpeg'

const About = () => {
  return (
    <div className='about'>
      <ul>
        <li>
            <div className='user'>
                <div className='user-info'>
                    <img src={saad} alt="" />
                    <div>
                        <h3>AFIFI SAAD</h3>
                        <span>Casablanca, Maroc</span>
                    </div>
                </div>
                <br />
                <p>Étudiant à l'École Nationale des Sciences Appliquées de Khouribga, passionné par les technologies, l'innovation en informatique et les réseaux.</p>
            </div>
        </li>
        <li>
            <div className='user'>
                <div className='user-info'>
                    <img src={mehdi} alt="" />
                    <div>
                        <h3>EL MEHDI EL OUAKYL</h3>
                        <span>El Gara, Maroc</span>
                    </div>
                </div>
                <br />
                <p>Étudiant à l'École Nationale des Sciences Appliquées de Khouribga, passionné par les technologies, l'innovation en informatique et tout ce qui concerne les données.</p>
            </div>
        </li>
        <li>
            <div className='user'>
                <div className='user-info'>
                    <img src={meryem} alt="" />
                    <div>
                        <h3>MARYAM KETATNI</h3>
                        <span>Khouribga, Maroc</span>
                    </div>
                </div>
                <br />
                <p>Étudiante à l'École Nationale des Sciences Appliquées de Khouribga, passionnée par les technologies, l'innovation en informatique et la data science.</p>
            </div>
        </li>
      </ul>
    </div>
  )
}

export default About
