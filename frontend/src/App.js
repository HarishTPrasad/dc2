import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import OutputPage from './Components/Pages/OutputPage';
import FormA from './Components/Pages/FormA';
import Login from './Components/Pages/Login';
import Dashboard from './Components/Pages/Dashboard';
import Ticket from './Components/Pages/Ticket';
import ChangeM from './Components/Pages/ChangeM';
import TicketForm from './Components/Pages/TicketForm';
import Formview from './Components/Pages/Formview';
import Oldview from './Components/Pages/Oldview';


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
                    <Route path="output" element={<OutputPage />} />
                    <Route path="ticket" element={<Ticket />} />
                    <Route path="ticketform" element={<TicketForm />} />
                    <Route path="formview" element={<Formview />} />
                    <Route path="oldview" element={<Oldview />} />



              </Route>

     
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;