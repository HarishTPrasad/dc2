import axios from 'axios';

// For development (outside Docker)
const devBaseURL = 'http://10.0.1.221:5000/api';

// For production (inside Docker)
const prodBaseURL = '/api';

const api = axios.create({
  baseURL: process.env.NODE_ENV === 'production' ? prodBaseURL : devBaseURL
});

export default api;