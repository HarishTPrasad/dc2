import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
// import OutputPage from './Components/Pages/CMDash/OutputPage';
import FormA from './Components/Pages/CMDash/FormA';
import Login from './Components/Pages/Login';
import Dashboard from './Components/Pages/Dashboard';
// import Ticket from './Components/Pages/TicketDash/Ticket';
import ChangeM from './Components/Pages/CMDash/ChangeM';
// import TicketForm from './Components/Pages/TicketDash/TicketForm';
import Admin from './Components/Pages/Admin';
import Oldview from './Components/Pages/CMDash/Oldview';
// import TicketView from './Components/Pages/TicketDash/TicketView';
// import TicketUpdate from './Components/Pages/TicketDash/TicketUpdate';


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
                    {/* <Route path="output" element={<OutputPage />} /> */}
                    {/* <Route path="ticket" element={<Ticket />} />
                    <Route path="ticketview" element={<TicketView />} />
                    <Route path="ticketform" element={<TicketForm />} />
                    <Route path="ticketupdate" element={<TicketUpdate />} /> */}
                    <Route path="oldview" element={<Oldview />} />
                    <Route path="admin" element={<Admin />} />



              </Route>

     
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;