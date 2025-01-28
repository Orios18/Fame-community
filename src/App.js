import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HallOfFamePage from './pages/HallOfFamePage';
import './App.css';

function App() {
  return (
    <div className="app-wrapper">
      <Router>
        <Routes>
          {/* Render HallOfFamePage at the root ("/") */}
          <Route path="/" element={<HallOfFamePage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
