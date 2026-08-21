"use client";
import { createContext, useState, useEffect } from 'react';
import api from '../api/axios';

export const DoctorAuthContext = createContext();

export const DoctorAuthProvider = ({ children }) => {
  const [doctor, setDoctor] = useState(null);

  useEffect(() => {
    const storedDoctor = localStorage.getItem('doctorInfo');
    if (storedDoctor) setDoctor(JSON.parse(storedDoctor));
  }, []);

  const login = async (email, password) => {
    const res = await api.post('/doctor/auth/login', { email, password });
    setDoctor(res.data);
    localStorage.setItem('doctorInfo', JSON.stringify(res.data));
  };

  const register = async (formData) => {
    const res = await api.post('/doctor/auth/register', formData);
    setDoctor(res.data);
    localStorage.setItem('doctorInfo', JSON.stringify(res.data));
  };

  const logout = () => {
    setDoctor(null);
    localStorage.removeItem('doctorInfo');
  };

  return (
    <DoctorAuthContext.Provider value={{ doctor, login, register, logout }}>
      {children}
    </DoctorAuthContext.Provider>
  );
};
