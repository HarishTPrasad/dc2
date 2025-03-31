import axios from 'axios';

const api = axios.create({
  baseURL: 'http://10.0.1.221:5000/api', // Direct to backend
  headers: {
    'Content-Type': 'application/json'
  }
});

export default api;