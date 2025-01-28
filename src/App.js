import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainPage from './pages/MainPage';
import HallOfFamePage from './pages/HallOfFamePage';
import './App.css';

function App() {
  return (
    <div className="app-wrapper">
      <Router>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/hall-of-fame" element={<HallOfFamePage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;