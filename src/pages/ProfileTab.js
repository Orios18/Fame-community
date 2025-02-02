import React, { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase";
import "./ProfileTab.css"; // Import a new CSS file for styling

function ProfileTab() {
  const [telegramUser, setTelegramUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const fallbackImageUrl = "/favicon.ico";

  useEffect(() => {
    const tg = window.Telegram?.WebApp;

    if (tg) {
      tg.ready(); // Ensure Telegram WebApp is initialized
      console.log("Telegram WebApp object:", tg);

      if (tg.initDataUnsafe?.user) {
        setTelegramUser(tg.initDataUnsafe.user);
        fetchUserData(tg.initDataUnsafe.user.id); // Fetch user data from Firestore
      } else {
        setError("No user data found in initDataUnsafe.");
        console.error("initDataUnsafe:", tg.initDataUnsafe);
      }
    } else {
      setError("Telegram WebApp not found. Please open this app inside Telegram.");
      console.error("Telegram.WebApp not found in window object.");
    }
  }, []);

  const fetchUserData = async (userId) => {
    try {
      const colRef = collection(db, "Users");
      const userQuery = query(colRef, where("id", "==", userId));
      const snapshot = await getDocs(userQuery);
      if (!snapshot.empty) {
        const data = snapshot.docs[0].data();
        setUserData(data);
      } else {
        setError("User data not found in Firestore.");
      }
    } catch (err) {
      console.error("Firestore Error:", err);
      setError("Failed to load user data.");
    } finally {
      setLoading(false);
    }
  };

  if (error) {
    return (
      <div className="profile-container">
        <h1 className="profile-title">Profile</h1>
        <p className="profile-text">{error}</p>
        <p className="profile-text">
          Make sure you open this app <strong>inside Telegram’s in-app browser</strong> via a WebApp button.
        </p>
      </div>
    );
  }

  if (!telegramUser || loading) {
    return (
      <div className="profile-container">
        <h1 className="profile-title">Profile</h1>
        <p className="profile-text">Loading user data...</p>
      </div>
    );
  }

  return (
    <div className="profile-container">
      <h1 className="profile-title">Your Telegram Profile</h1>
      <div className="profile-content">
        <img
          src={userData?.image_url || fallbackImageUrl}
          alt="Profile"
          className="profile-image"
        />
        <div className="profile-details">
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
          <div className="profile-field">
            <strong>Fame Level:</strong> {userData?.fame || 0}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileTab;