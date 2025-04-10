// import axios from 'axios';

// const api = axios.create({
//   baseURL: 'http://10.0.1.221:5000/api', 
//   headers: {
//     'Content-Type': 'application/json'
//   }
// });


// api.interceptors.request.use(config => {
//   if (config.data instanceof FormData) {
//     config.headers['Content-Type'] = 'multipart/form-data';
//   }
//   return config;
// });

// export default api;

import axios from 'axios';

const api = axios.create({
  baseURL: 'http://10.0.1.221:5000/api',
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: false
});

api.interceptors.request.use(
  (config) => {
    if (config.data instanceof FormData) {
      config.headers['Content-Type'] = 'multipart/form-data';
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('🔴 API Error:', error?.response || error.message);
    return Promise.reject(error);
  }
);

export default api;
