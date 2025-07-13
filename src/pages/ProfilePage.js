import React from 'react';
import ProfileTab from './ProfileTab';
import './ProfilePage.css';

function ProfilePage() {
  return (
    <div className="profile-page-container">
      {/* Header Section */}
      <header className="header-section">
        <div className="header-content">
          <img src="/logo192.png" alt="Logo" className="header-logo" />
          <h1 className="header-title">𝐹𝒶𝓂𝑒</h1>
        </div>
      </header>

      {/* Profile Content */}
      <div className="profile-content">
        <ProfileTab />
      </div>
    </div>
  );
}

export default ProfilePage; 