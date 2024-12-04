import React, { useState } from 'react';
import axios from 'axios';

const Doctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [newDoctor, setNewDoctor] = useState({
    name: '',
    specialty: '',
    crm: '',
    phone: '',
    email: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewDoctor({ ...newDoctor, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8080/api/doctors', newDoctor);
      alert('Médico cadastrado com sucesso!');
      // Recarregar a lista de médicos após cadastro
      loadDoctors();
    } catch (error) {
      alert('Erro ao cadastrar médico!');
    }
  };

  const loadDoctors = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/doctors');
      setDoctors(response.data);
    } catch (error) {
      alert('Erro ao carregar médicos!');
    }
  };

  React.useEffect(() => {
    loadDoctors();
  }, []);

  return (
    <div>
      <h1>Cadastro de Médicos</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Nome do médico"
          value={newDoctor.name}
          onChange={handleChange}
        />
        <input
          type="text"
          name="specialty"
          placeholder="Especialidade"
          value={newDoctor.specialty}
          onChange={handleChange}
        />
        <input
          type="text"
          name="crm"
          placeholder="Número do CRM"
          value={newDoctor.crm}
          onChange={handleChange}
        />
        <input
          type="text"
          name="phone"
          placeholder="Telefone"
          value={newDoctor.phone}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="E-mail"
          value={newDoctor.email}
          onChange={handleChange}
        />
        <button type="submit">Cadastrar Médico</button>
      </form>

      <h2>Lista de Médicos</h2>
      <ul>
        {doctors.map(doctor => (
          <li key={doctor.id}>{doctor.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Doctors;
