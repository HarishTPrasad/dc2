import axios from 'axios';

const api = axios.create({
  baseURL: 'http://10.0.1.221:5000/api', 
  headers: {
    'Content-Type': 'application/json'
  }
});


api.interceptors.request.use(config => {
  if (config.data instanceof FormData) {
    config.headers['Content-Type'] = 'multipart/form-data';
  }
  return config;
});

export default api;