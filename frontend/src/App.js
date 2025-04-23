import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import FormA from './Components/Pages/CMDash/FormA';
import Login from './Components/Pages/Login';
import Dashboard from './Components/Pages/Dashboard';
import ChangeM from './Components/Pages/CMDash/ChangeM';
import Admin from './Components/Pages/Admin/Admin';
import Oldview from './Components/Pages/CMDash/Oldview';
import Users from './Components/Pages/Admin/Utils/Users';
import Technologies from './Components/Pages/Admin/Utils/Technologies';
import Projects from './Components/Pages/Admin/Utils/Projects';
import Clients from './Components/Pages/Admin/Utils/Clients';
import GRC from './Components/Pages/GRCDash/GRC';

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = sessionStorage.getItem('authToken');
  return isAuthenticated ? children : <Navigate to="/" replace />;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        
       
              <Route 
                path="/dashboard"                                                             
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              >
          
                    <Route path="form-a" element={<FormA />} />
                    <Route path="changem" element={<ChangeM />} />
                    <Route path="oldview" element={<Oldview />} />
                    <Route path="admin" element={<Admin />} />
                    <Route path="users" element={<Users />} />
                    <Route path="projects" element={<Projects />} />
                    <Route path="technologies" element={<Technologies />} />
                    <Route path="Clients" element={<Clients />} />
                    <Route path="GRC" element={<GRC />} />



              </Route>

     
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;