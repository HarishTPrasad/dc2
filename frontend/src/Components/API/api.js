import axios from "axios";

// API instance
// const api = axios.create({
//   baseURL: "http://localhost:5000/api", // Update this if needed
// });
// const api = axios.create({
//     baseURL: "http://dc2-backend-1:5000/api", 
//   });
// const api = axios.create({
//   baseURL: "http://10.0.1.221/api/form",
// });
// const api = axios.create({
//   baseURL: "/api" // Let Nginx handle routing
// });

const api = axios.create({
  baseURL: process.env.NODE_ENV === 'production' 
    ? '/api' 
    : 'http://dc2-backend-1:5000/api'
});
  

export default api;
