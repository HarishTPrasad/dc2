import axios from "axios";

// API instance
// const api = axios.create({
//   baseURL: "http://localhost:5000/api", // Update this if needed
// });
const api = axios.create({
    baseURL: "http://dc2-backend-1:5000/api", 
  });
  

export default api;
