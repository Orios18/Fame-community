import React, { useEffect, useState } from "react";

/**
 * A profile page that attempts to read user data
 * from the Telegram WebApp environment.
 */
function ProfileTab() {
  const [telegramUser, setTelegramUser] = useState(null);

  useEffect(() => {
    // Check if the Telegram WebApp object exists
    const tg = window.Telegram?.WebApp;

    if (tg?.initDataUnsafe?.user) {
      // The user object typically has fields like:
      // { id, first_name, last_name, username, language_code, is_premium, ... }
      setTelegramUser(tg.initDataUnsafe.user);
    }
  }, []);

  if (!telegramUser) {
    return (
      <div style={styles.container}>
        <h1 style={styles.title}>Profile</h1>
        <p style={styles.text}>
          We couldn’t detect your Telegram user info. Make sure you open this app
          <br />
          <strong>inside Telegram’s in-app browser</strong> via a WebApp link.
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
      {/* Add more fields as desired (language_code, is_premium, etc.) */}
    </div>
  );
}

// A little inline styling for demonstration
const styles = {
  container: {
    minHeight: "400px", // so it matches the size of your other tabs
    padding: "1rem",
    textAlign: "center",
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
