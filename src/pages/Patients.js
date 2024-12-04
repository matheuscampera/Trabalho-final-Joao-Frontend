import React, { useState } from 'react';
import axios from 'axios';

const Patients = () => {
  const [patients, setPatients] = useState([]);
  const [newPatient, setNewPatient] = useState({
    name: '',
    birthDate: '',
    cpf: '',
    phone: '',
    email: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewPatient({ ...newPatient, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8080/api/patients', newPatient);
      alert('Paciente cadastrado com sucesso!');
      // Recarregar a lista de pacientes após cadastro
      loadPatients();
    } catch (error) {
      alert('Erro ao cadastrar paciente!');
    }
  };

  const loadPatients = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/patients');
      setPatients(response.data);
    } catch (error) {
      alert('Erro ao carregar pacientes!');
    }
  };

  React.useEffect(() => {
    loadPatients();
  }, []);

  return (
    <div>
      <h1>Cadastro de Pacientes</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Nome do paciente"
          value={newPatient.name}
          onChange={handleChange}
        />
        <input
          type="date"
          name="birthDate"
          value={newPatient.birthDate}
          onChange={handleChange}
        />
        <input
          type="text"
          name="cpf"
          placeholder="CPF"
          value={newPatient.cpf}
          onChange={handleChange}
        />
        <input
          type="text"
          name="phone"
          placeholder="Telefone"
          value={newPatient.phone}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="E-mail"
          value={newPatient.email}
          onChange={handleChange}
        />
        <button type="submit">Cadastrar Paciente</button>
      </form>

      <h2>Lista de Pacientes</h2>
      <ul>
        {patients.map(patient => (
          <li key={patient.id}>{patient.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Patients;
