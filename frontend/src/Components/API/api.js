import axios from "axios";

// API instance
// const api = axios.create({
//   baseURL: "http://localhost:5000/api", // Update this if needed
// });
const api = axios.create({
    baseURL: "http://10.0.1.221/api", 
  });
  

export default api;
