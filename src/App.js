import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';  // Importando o Router

// Importando suas páginas
import Home from './pages/Home';
import Patients from './pages/Patients';
import Doctors from './pages/Doctors';
import Appointments from './pages/Appointments';
import Navbar from './components/Navbar';

const App = () => {
  return (
    <Router>
      {/* Incluindo o Navbar */}
      <Navbar />
      <div className="content">
        <Routes>
          {/* Definindo as rotas */}
          <Route path="/" element={<Home />} />
          <Route path="/patients" element={<Patients />} />
          <Route path="/doctors" element={<Doctors />} />
          <Route path="/appointments" element={<Appointments />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
