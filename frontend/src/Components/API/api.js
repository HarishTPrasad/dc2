// import axios from "axios";

// // // API instance
// // // const api = axios.create({
// // //   baseURL: "http://localhost:5000/api", // Update this if needed
// // // });
// // const api = axios.create({
// //     baseURL: "http://10.0.1.221/api", 
// //   });
  
// const api = axios.create({
//   baseURL: process.env.NODE_ENV === 'production' 
//     ? '/api'  // ✅ Uses Nginx proxy in Docker
//     :"http://10.0.1.221/api" // ✅ Direct connection for local dev
// });


// export default api;

import axios from "axios";

const api = axios.create({
  baseURL: process.env.NODE_ENV === "production"
    ? "/api" // ✅ Uses Nginx proxy in Docker
    : "http://10.0.1.221/api", // ✅ Direct connection for local dev
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * Submit form data to the backend.
 * @param {Object} formData - The form data to submit.
 * @returns {Promise<Object>} - The response from the server.
 */
export const submitForm = async (formData) => {
  try {
    const response = await api.post("/submit", formData);
    return response.data; // ✅ Return server response
  } catch (error) {
    console.error("❌ Error submitting form:", error);
    throw error; // ✅ Ensures error is properly caught in `handleSubmit`
  }
};

export default api;
