import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/Appointments.css";

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [newAppointment, setNewAppointment] = useState({
    date: "",
    time: "",
    reason: "",
    status: "Pendente",
    patientId: "",
    doctorId: "",
  });

  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  // Função para carregar pacientes e médicos
  const loadData = async () => {
    try {
      const patientsResponse = await axios.get("http://localhost:8080/api/patients");
      setPatients(patientsResponse.data);
      const doctorsResponse = await axios.get("http://localhost:8080/api/doctors");
      setDoctors(doctorsResponse.data);
    } catch (error) {
      alert("Erro ao carregar pacientes e médicos!");
    }
  };

  // Função para carregar consultas
  const loadAppointments = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/appointments");
      setAppointments(response.data);
    } catch (error) {
      alert("Erro ao carregar consultas!");
    }
  };

  // Função para lidar com a mudança dos campos de input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewAppointment({ ...newAppointment, [name]: value });
  };

  // Função para enviar o formulário de consulta
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Converter a data e hora para o formato correto (YYYY-MM-DDTHH:mm)
    const { date, time } = newAppointment;
    const dateTime = new Date(date.split('-').join('/')); // Converte a data para o formato MM/DD/YYYY
    const [hours, minutes] = time.split(':'); // Separa a hora e os minutos
    dateTime.setHours(hours, minutes); // Define a hora e os minutos na data

    try {
      const response = await axios.post('http://localhost:8080/api/appointments', {
        ...newAppointment,
        date: dateTime,  // Enviar a data e hora combinados
      });

      console.log('Resposta do servidor:', response.data);
      alert('Consulta cadastrada com sucesso!');
      loadAppointments();  // Carregar consultas após o cadastro
    } catch (error) {
      alert('Erro ao cadastrar consulta!');
    }
  };

  // Carregar os dados ao montar o componente
  useEffect(() => {
    loadData();
    loadAppointments();
  }, []);

  // Função para formatar a data e hora
  const formatDate = (dateString) => {
    const date = dateString.toString();

    // Extrair a data e a hora
    const day = date.substring(8, 10); // Extrai o dia
    const month = date.substring(5, 7); // Extrai o mês
    const year = date.substring(0, 4); // Extrai o ano

    const hours = date.substring(8, 10); // Extrai as horas
    const minutes = date.substring(10, 12); // Extrai os minutos

    // Formatar a data como "DD/MM/YYYY"
    const formattedDate = `${day}/${month}/${year}`;
    // Formatar a hora como "HH:mm"
    const formattedTime = `${hours}:${minutes}`;

    return `${formattedDate} ${formattedTime}`;
  };

  // Exibir detalhes da consulta
  const handleDetails = (appointment) => {
    setSelectedAppointment(appointment);
  };

  // Fechar o modal de detalhes
  const handleCloseDetails = () => {
    setSelectedAppointment(null);
  };

  return (
    <div>
      <h1>Cadastro de Consultas</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="date"
          name="date"
          value={newAppointment.date}
          onChange={handleChange}
          required
        />
        <input
          type="time"
          name="time"
          value={newAppointment.time}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="reason"
          placeholder="Motivo da consulta"
          value={newAppointment.reason}
          onChange={handleChange}
          required
        />
        <select
          name="status"
          value={newAppointment.status}
          onChange={handleChange}
        >
          <option value="Pendente">Pendente</option>
          <option value="Confirmada">Confirmada</option>
          <option value="Cancelada">Cancelada</option>
        </select>
        <select
          name="patientId"
          value={newAppointment.patientId}
          onChange={handleChange}
          required
        >
          <option value="">Selecione um paciente</option>
          {patients.map((patient) => (
            <option key={patient.id} value={patient.id}>
              {patient.name}
            </option>
          ))}
        </select>
        <select
          name="doctorId"
          value={newAppointment.doctorId}
          onChange={handleChange}
          required
        >
          <option value="">Selecione um médico</option>
          {doctors.map((doctor) => (
            <option key={doctor.id} value={doctor.id}>
              {doctor.name}
            </option>
          ))}
        </select>
        <button type="submit">Cadastrar Consulta</button>
      </form>

      <h2>Lista de Consultas</h2>
      <table className="appointments-table">
        <thead>
          <tr>
            <th>Motivo</th>
            <th>Status</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((appointment) => (
            <tr key={appointment.id}>
              <td>{appointment.reason}</td>
              <td>{appointment.status}</td>
              <td>
                <button
                  className="details-button"
                  onClick={() => handleDetails(appointment)}
                >
                  Detalhes
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedAppointment && (
        <div className="appointment-details-modal">
          <div className="appointment-details">
            <h2>Detalhes da Consulta</h2>
            <p><strong>Paciente:</strong> {selectedAppointment.patient.name}</p>
            <p><strong>Médico:</strong> {selectedAppointment.doctor.name}</p>
            <p><strong>Data:</strong> {formatDate(selectedAppointment.date)}</p> {/* Aqui usamos a função formatDate */}
            <p><strong>Status:</strong> {selectedAppointment.status}</p>
            <button className="close-button" onClick={handleCloseDetails}>
              Fechar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Appointments;
