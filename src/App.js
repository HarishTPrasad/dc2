import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import OutputPage from './Components/OutputPage'
import FormA from './Components/FormA';

function App() {

  return (
    <div>
     
  
     <Router>
      <Routes>
        <Route path="/" element={<FormA />} />
        <Route path="/output" element={<OutputPage/>} />
      </Routes>
    </Router>
      

    </div>
  )
}

export default App
