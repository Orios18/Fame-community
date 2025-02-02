import React, { useEffect, useState } from "react";

function ProfileTab() {
  const [telegramUser, setTelegramUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const tg = window.Telegram?.WebApp;

    if (tg) {
      tg.ready(); // Ensure Telegram WebApp is initialized
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
      <div style={styles.container}>
        <h1 style={styles.title}>Profile</h1>
        <p style={styles.text}>{error}</p>
        <p style={styles.text}>
          Make sure you open this app <strong>inside Telegram’s in-app browser</strong> via a WebApp button.
        </p>
      </div>
    );
  }

  if (!telegramUser) {
    return (
      <div style={styles.container}>
        <h1 style={styles.title}>Profile</h1>
        <p style={styles.text}>Loading user data...</p>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Your Telegram Profile</h1>
      <div style={styles.field}>
        <strong>First Name:</strong> {telegramUser.first_name}
      </div>
      {telegramUser.last_name && (
        <div style={styles.field}>
          <strong>Last Name:</strong> {telegramUser.last_name}
        </div>
      )}
      {telegramUser.username && (
        <div style={styles.field}>
          <strong>Username:</strong> @{telegramUser.username}
        </div>
      )}
      <div style={styles.field}>
        <strong>User ID:</strong> {telegramUser.id}
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "400px",
    padding: "1rem",
    textAlign: "center",
    backgroundColor: "#1e1e1e",
    color: "white",
  },
  title: {
    marginBottom: "1rem",
  },
  text: {
    lineHeight: "1.5",
  },
  field: {
    margin: "0.5rem 0",
    fontSize: "1.1rem",
  },
};

export default ProfileTab;