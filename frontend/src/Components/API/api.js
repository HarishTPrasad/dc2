import axios from "axios";

// // API instance
// // const api = axios.create({
// //   baseURL: "http://localhost:5000/api", // Update this if needed
// // });
// const api = axios.create({
//     baseURL: "http://10.0.1.221/api", 
//   });
  
const api = axios.create({
  baseURL: process.env.NODE_ENV === 'production' 
    ? '/api'  // ✅ Uses Nginx proxy in Docker
    :"http://10.0.1.221/api" // ✅ Direct connection for local dev
});


export default api;