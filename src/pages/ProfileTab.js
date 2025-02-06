import React, { useEffect, useState } from "react";
import "./ProfileTab.css"; // Import the CSS file

function ProfileTab() {
  const [telegramUser, setTelegramUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const tg = window.Telegram?.WebApp;

    if (tg) {
      tg.ready();
      console.log("Telegram WebApp object:", tg);

      if (tg.initDataUnsafe?.user) {
        setTelegramUser(tg.initDataUnsafe.user);
        console.log("User data:", tg.initDataUnsafe.user);
      } else {
        setError("No user data found in initDataUnsafe.");
        console.error("initDataUnsafe:", tg.initDataUnsafe);
      }
    } else {
      setError("Telegram WebApp not found. Please open this app inside Telegram.");
      console.error("Telegram.WebApp not found in window object.");
    }
  }, []);

  if (error) {
    return (
      <div className="profile-container">
        <h1 className="profile-title">Profile</h1>
        <p className="error-message">{error}</p>
        <p className="profile-text">
          Make sure you open this app <strong>inside Telegram’s in-app browser</strong> via a WebApp button.
        </p>
      </div>
    );
  }

  if (!telegramUser) {
    return (
      <div className="profile-container">
        <h1 className="profile-title">Profile</h1>
        <p className="loading-message">Loading user data...</p>
      </div>
    );
  }

  return (
    <div className="profile-container">
      <h1 className="profile-title">Your Telegram Profile</h1>
      <div className="profile-field">
        <strong>First Name:</strong> {telegramUser.first_name}
      </div>
      {telegramUser.last_name && (
        <div className="profile-field">
          <strong>Last Name:</strong> {telegramUser.last_name}
        </div>
      )}
      {telegramUser.username && (
        <div className="profile-field">
          <strong>Username:</strong> @{telegramUser.username}
        </div>
      )}
      <div className="profile-field">
        <strong>User ID:</strong> {telegramUser.id}
      </div>
    </div>
  );
}

export default ProfileTab;
