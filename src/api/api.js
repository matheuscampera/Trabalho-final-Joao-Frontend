const API_URL = 'http://localhost:8080/api';

// Função para formatar a data no formato correto para o backend
const formatDateForBackend = (date) => {
    const d = new Date(date);
    return [
        d.getFullYear(),
        d.getMonth() + 1, // Meses começam em 0, então adicionamos 1
        d.getDate(),
        d.getHours(),
        d.getMinutes()
    ];
};

// Função para criar um paciente
export const createPatient = async (patientData) => {
    try {
        const response = await fetch(`${API_URL}/patients`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(patientData),
        });
        if (!response.ok) {
            throw new Error('Erro ao criar paciente');
        }
        return await response.json();
    } catch (error) {
        console.error('Erro na criação do paciente:', error);
        throw error;
    }
};

// Função para criar um médico
export const createDoctor = async (doctorData) => {
    try {
        const response = await fetch(`${API_URL}/doctors`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(doctorData),
        });
        if (!response.ok) {
            throw new Error('Erro ao criar médico');
        }
        return await response.json();
    } catch (error) {
        console.error('Erro na criação do médico:', error);
        throw error;
    }
};

// Função para criar uma consulta
export const createAppointment = async (appointmentData) => {
    try {
        // Formatar a data no formato esperado pelo backend
        const formattedDate = formatDateForBackend(appointmentData.date);

        const response = await fetch(`${API_URL}/appointments`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                ...appointmentData,  // Mantém os outros dados
                date: formattedDate   // Substitui o campo date formatado
            }),
        });

        if (!response.ok) {
            throw new Error('Erro ao criar consulta');
        }

        return await response.json();
    } catch (error) {
        console.error('Erro na criação da consulta:', error);
        throw error;
    }
};

// Função para obter todas as consultas
export const getAppointments = async () => {
    try {
        const response = await fetch(`${API_URL}/appointments`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) {
            throw new Error('Erro ao buscar consultas');
        }
        return await response.json();
    } catch (error) {
        console.error('Erro ao obter as consultas:', error);
        throw error;
    }
};
