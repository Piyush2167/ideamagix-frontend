import axios from 'axios';

const api = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_BASE_URL}/api`,
});

// Let's add token interceptor
api.interceptors.request.use((config) => {
  const doctorInfo = JSON.parse(localStorage.getItem('doctorInfo'));
  const patientInfo = JSON.parse(localStorage.getItem('patientInfo'));
  
  let token = null;
  // If hitting doctor or prescriptions route, prefer doctor token
  if ((config.url.includes('/doctor') || config.url.includes('/prescriptions')) && doctorInfo?.token) {
    token = doctorInfo.token;
  } else if (patientInfo?.token) {
    token = patientInfo.token;
  } else if (doctorInfo?.token) {
    token = doctorInfo.token;
  }

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default api;
