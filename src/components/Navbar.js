import React from 'react';
import { Link } from 'react-router-dom';  // Importando o Link do React Router
import '../styles/Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-buttons">
        {/* Botões de navegação */}
        <Link to="/" className="navbar-button">Home</Link>
        <Link to="/patients" className="navbar-button">Pacientes</Link>
        <Link to="/doctors" className="navbar-button">Médicos</Link>
        <Link to="/appointments" className="navbar-button">Consultas</Link>
      </div>
    </nav>
  );
}

export default Navbar;
