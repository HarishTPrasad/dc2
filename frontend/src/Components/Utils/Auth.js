// src/utils/auth.js
export const getCurrentUser = () => {
  return JSON.parse(sessionStorage.getItem("userData")) || {};
};

export const isAdmin = () => {
  return getCurrentUser().role === "admin";
};

export const hasRole = (role) => {
  return getCurrentUser().role === role;
};

export const getFullName = () => {
  return getCurrentUser().fullname || getCurrentUser().username || "User";
};