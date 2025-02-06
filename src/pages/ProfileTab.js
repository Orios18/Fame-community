import React, { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase"; // Ensure correct Firebase import
import "./ProfileTab.css"; // Import the styles

function ProfileTab() {
  const [telegramUser, setTelegramUser] = useState(null);
  const [fameLevel, setFameLevel] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const tg = window.Telegram?.WebApp;

    if (tg) {
      tg.ready();
      console.log("Telegram WebApp object:", tg);

      if (tg.initDataUnsafe?.user) {
        const user = tg.initDataUnsafe.user;
        setTelegramUser(user);
        console.log("User data:", user);
        fetchFameLevel(user.id); // Fetch fame after setting user
      } else {
        setError("No user data found in initDataUnsafe.");
        console.error("initDataUnsafe:", tg.initDataUnsafe);
      }
    } else {
      setError("Telegram WebApp not found. Please open this app inside Telegram.");
      console.error("Telegram.WebApp not found in window object.");
    }
  }, []);

  async function fetchFameLevel(userId) {
    try {
      const userRef = doc(db, "Users", userId.toString());
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        setFameLevel(userSnap.data().fame);
        console.log("Fame level:", userSnap.data().fame);
      } else {
        console.warn("No fame data found for this user.");
        setFameLevel("N/A");
      }
    } catch (error) {
      console.error("Error fetching fame level:", error);
      setFameLevel("Error");
    }
  }

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
      <h2 className="profile-header">Character Info</h2>
      <div className="profile-content">
        {/* Profile Picture */}
        <img
          src={telegramUser.photo_url || "/default-avatar.png"}
          alt="Profile"
          className="profile-avatar"
        />

        {/* User Info */}
        <div className="profile-details">
          <div className="profile-field">
            <span className="field-label">Name:</span> {telegramUser.first_name}
          </div>
          {telegramUser.username && (
            <div className="profile-field">
              <span className="field-label">Username:</span> @{telegramUser.username}
            </div>
          )}
          <div className="profile-field">
            <span className="field-label">User ID:</span> {telegramUser.id}
          </div>
          <div className="profile-field">
            <span className="field-label">Fame:</span> {fameLevel !== null ? fameLevel : "Loading..."}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileTab;
