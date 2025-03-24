import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import OutputPage from './Components/Pages/OutputPage';
import FormA from './Components/Pages/FormA';
import Login from './Components/Pages/Login';
import Dashboard from './Components/Pages/Dashboard';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = sessionStorage.getItem('authToken');
  return isAuthenticated ? children : <Navigate to="/" replace />;
};

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Route */}
        <Route path="/" element={<Login />} />
        
        {/* Protected Routes */}
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
        
        <Route path="/form-a" element={
          <ProtectedRoute>
            <FormA />
          </ProtectedRoute>
        } />
        
        <Route path="/output" element={
          <ProtectedRoute>
            <OutputPage />
          </ProtectedRoute>
        } />

        {/* Catch-all route for invalid paths */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;