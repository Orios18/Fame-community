import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HallOfFamePage from './pages/HallOfFamePage';
import LandingPage from './pages/LandingPage';
import HelpCenter from './pages/HelpCenter';
import ProfilePage from './pages/ProfilePage';
import Navbar from './components/Navbar';
import './App.css';

function App() {
  return (
    <div className="app-wrapper">
      <Router>
        <Routes>
          {/* Landing page route */}
          <Route path="/" element={<LandingPage />} />
          {/* Hall of Fame page route */}
          <Route path="/hall-of-fame" element={<HallOfFamePage />} />
          {/* Profile page route */}
          <Route path="/profile" element={<ProfilePage />} />
          {/* Help page route */}
          <Route path="/help" element={<HelpCenter />} />
        </Routes>
        <Navbar />
      </Router>
    </div>
  );
}

export default App;
