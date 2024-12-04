import React from 'react';
import '../styles/Home.css';

const Home = () => {
  return (
    <div className="home-container">
      <div className="home-content">
        <h1 className="home-title">Bem-vindo ao Consultório Médico</h1>
        <p className="home-subtitle">
          Gerencie consultas, médicos e pacientes de forma eficiente e organizada.
        </p>
        <a href="/appointments" className="home-button">
          Acessar Consultas
        </a>
      </div>
    </div>
  );
};

export default Home;
