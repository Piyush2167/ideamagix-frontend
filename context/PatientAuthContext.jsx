"use client";
import { createContext, useState, useEffect } from 'react';
import api from '../api/axios';

export const PatientAuthContext = createContext();

export const PatientAuthProvider = ({ children }) => {
  const [patient, setPatient] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem('patientInfo');
    if (stored) setPatient(JSON.parse(stored));
  }, []);

  const login = async (email, password) => {
    const res = await api.post('/patient/auth/login', { email, password });
    setPatient(res.data);
    localStorage.setItem('patientInfo', JSON.stringify(res.data));
  };

  const register = async (formData) => {
    const res = await api.post('/patient/auth/register', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    setPatient(res.data);
    localStorage.setItem('patientInfo', JSON.stringify(res.data));
  };

  const logout = () => {
    setPatient(null);
    localStorage.removeItem('patientInfo');
  };

  return (
    <PatientAuthContext.Provider value={{ patient, login, register, logout }}>
      {children}
    </PatientAuthContext.Provider>
  );
};
