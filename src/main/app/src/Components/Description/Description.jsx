import React from 'react'
import './Description.css'
import desc from '../../assets/desc.jpg'

const Description = () => {
  return (
    <div className='desc'>
      <div className='left'>
        <img src={desc} alt="description photo" className='desc-img'/>
      </div>
      <div className="right">
        <h1>Description :</h1>
        <br />
        <p>Bienvenue sur Dr Vito, votre partenaire de confiance pour anticiper et prévenir les maladies. Nous utilisons des algorithmes avancés et des analyses de données médicales pour vous offrir des évaluations personnalisées, afin d'identifier vos risques de santé.</p>
        <p>Découvrez nos outils interactifs et obtenez des recommandations adaptées pour améliorer votre bien-être. En remplissant un formulaire de symptômes, vous pouvez visualiser l'état des maladies sous forme de courbes et accéder à une plateforme sécurisée pour suivre votre santé.</p>
        <p>Prenez le contrôle de votre santé avec Dr Vito et adoptez des mesures proactives pour un avenir plus sain. Notre système se base sur des modèles de Machine Learning et de Deep Learning, entraînés sur de grandes quantités de données textuelles pour fournir des analyses précises et pertinentes.</p>
        <p>Notre objectif est de vous permettre de dialoguer en temps réel avec un médecin robot. Ce dernier comprend les questions posées par l'utilisateur et produit des réponses sous forme de suites complexes d'informations, d'idées et de pensées artificielles. Par exemple, il peut vous fournir la définition d'une maladie, les symptômes associés ou encore évaluer la maladie que vous pourriez avoir en fonction des symptômes présentés.</p>
        <p>Nous sommes une équipe d'étudiants en ingénierie, encadrée par Pr. Noreddine Gherabi, passionnés par l'intelligence artificielle et la santé. Notre projet vous permet de maîtriser de nouvelles technologies front-end comme React et des langages back-end tels que Python et Spring Boot, tout en offrant une solution innovante pour la prévention et la gestion des maladies.</p>
      </div>
    </div>
  )
}

export default Description
