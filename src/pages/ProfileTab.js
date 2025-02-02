import React, { useEffect, useState } from "react";
import { collection, getDocs, query, where, doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import "./ProfileTab.css";

function ProfileTab() {
  const [telegramUser, setTelegramUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const fallbackImageUrl = "/favicon.ico";

  useEffect(() => {
    const tg = window.Telegram?.WebApp;
    
    const initializeUser = async (user) => {
      try {
        const userRef = doc(db, "Users", user.id.toString());
        const userSnap = await getDoc(userRef); // Changed to getDoc

        if (!userSnap.exists()) {
          // Create new user document
          await setDoc(userRef, {
            id: user.id,
            first_name: user.first_name,
            last_name: user.last_name || '',
            username: user.username || '',
            image_url: user.photo_url || fallbackImageUrl,
            fame: 0,
            created_at: new Date()
          });
        }

        // Fetch updated data
        const newUserSnap = await getDoc(userRef); // Changed to getDoc
        setUserData(newUserSnap.data());
      } catch (err) {
        console.error("Firestore Error:", err);
        setError("Error loading user data");
      } finally {
        setLoading(false);
      }
    };

    if (tg) {
      tg.ready();
      const user = tg.initDataUnsafe?.user;
      
      if (user) {
        setTelegramUser(user);
        initializeUser(user);
      } else {
        setError("Telegram user data not available");
        setLoading(false);
      }
    } else {
      setError("Please open in Telegram");
      setLoading(false);
    }
  }, []);

  if (error) {
    return (
      <div className="profile-container">
        <h1>Profile</h1>
        <p className="error">{error}</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="profile-container">
        <h1>Profile</h1>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="profile-container">
      <h1>Your Profile</h1>
      <div className="profile-content">
        <img
          src={userData?.image_url || fallbackImageUrl}
          alt="Profile"
          className="profile-image"
        />
        <div className="profile-details">
          <p><strong>Name:</strong> {userData.first_name} {userData.last_name}</p>
          {userData.username && <p><strong>Username:</strong> @{userData.username}</p>}
          <p><strong>User ID:</strong> {userData.id}</p>
          <p><strong>Fame Level:</strong> {userData.fame}</p>
        </div>
      </div>
    </div>
  );
}

export default ProfileTab;