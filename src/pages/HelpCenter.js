import React from "react";

/**
 * Help Center Page: Provides basic FAQ and support contact details.
 */
function HelpCenter() {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>📖 Help Center</h1>

      <div style={styles.section}>
        <h2 style={styles.subtitle}> Frequently Asked Questions</h2>
        <p><strong>Q: What is Fame?</strong></p>
        <p>A: Think of Fame as your digital reputation scorecard.
             It's a reliable and easy way to build trust online,
              powered by you and your peers—no central authority involved.
              Your actions and contributions within the network can earn you Fame or Defame, creating an immutable record of your trustworthiness.
        </p>

        <p><strong>Q: How do I increase my Fame level?</strong></p>
        <p>A: Your Fame level increases as you actively engage in meaningful activities, such as completing successful deals,
             making valuable contributions, and building a strong reputation within your network. Additionally, your customers,
              clients, or connections can send you Fame as a recognition of your efforts, which further boosts your Fame level.
             The more impactful your actions and the stronger your relationships, the faster your Fame level will grow.</p>

        <p><strong>Q: Is my Fame linked to my Telegram account?</strong></p>
        <p>A: Yes, your Fame level is tied to your Telegram ID , and reflected on the Blockchain , so no one can touch it.</p>
      </div>

      <div style={styles.section}>
        <h2 style={styles.subtitle}>📞 Need Support?</h2>
        <p>If you have any issues, feel free to contact us via Telegram:</p>
        <ul style={styles.list}>
          <li>📩 <a href="https://t.me/fames" target="_blank" style={styles.link}>@fames</a> (General Support)</li>
          <li>👨‍💻 <a href="https://t.me/ton_fields" target="_blank" style={styles.link}>@ton_fields</a> (Technical Help)</li>
          <li>💬 <a href="https://t.me/badihi" target="_blank" style={styles.link}>@badihi</a> (Community Manager)</li>
        </ul>
      </div>

      <div style={styles.section}>
        <h2 style={styles.subtitle}>🔗 External Resources</h2>
        <li> <a href="https://telegra.ph/Hall-Of-Fame-09-24" target="_blank" style={styles.link}>📄 White Paper</a></li>
        <p>For more information about Fame and the TON blockchain, visit:</p>
        <ul style={styles.list}>
          <li>🌍 <a href="https://ton.org" target="_blank" style={styles.link}>TON Official Website</a></li>
        </ul>
      </div>
    </div>
  );
}

// Inline styles for simplicity
const styles = {
  container: {
    minHeight: "400px",
    padding: "1.5rem",
    textAlign: "center",
    color: "#FFFFFF",
    backgroundColor: "#2C2C2C",
    borderRadius: "16px",
    boxShadow: "0 8px 20px rgba(0, 0, 0, 0.2)",
  },
  title: {
    fontSize: "2rem",
    marginBottom: "1rem",
  },
  section: {
    marginBottom: "1.5rem",
  },
  subtitle: {
    fontSize: "1.5rem",
    color: "#66CFFF",
  },
  list: {
    listStyleType: "none",
    padding: 0,
  },
  link: {
    color: "#66CFFF",
    textDecoration: "none",
    fontWeight: "bold",
  },
};

export default HelpCenter;
