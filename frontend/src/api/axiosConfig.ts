import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000/api', // Asegúrate de que esta URL coincide con la del backend
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
