import React, { useEffect, useState } from "react";

/**
 * A profile page that attempts to read user data
 * from the Telegram WebApp environment.
 */
function ProfileTab() {
  const [telegramUser, setTelegramUser] = useState(null);

  useEffect(() => {
    const tg = window.Telegram?.WebApp;

    if (tg) {
      tg.ready(); // Ensure Telegram WebApp is initialized
      console.log("Telegram WebApp initialized:", tg);

      setTimeout(() => {
        if (tg.initDataUnsafe?.user) {
          setTelegramUser(tg.initDataUnsafe.user);
          console.log("User data:", tg.initDataUnsafe.user);
        } else {
          console.error("No user data found in initDataUnsafe:", tg.initDataUnsafe);
        }
      }, 1000); // Delayed check for user data (1 second)
    } else {
      console.error("Telegram WebApp not found");
    }
  }, []);

  if (!telegramUser) {
    return (
      <div style={styles.container}>
        <h1 style={styles.title}>Profile</h1>
        <p style={styles.text}>
          We couldn’t detect your Telegram user info. Make sure you open this app
          <br />
          <strong>inside Telegram’s in-app browser</strong> via a WebApp button.
        </p>
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

// A little inline styling for demonstration
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
