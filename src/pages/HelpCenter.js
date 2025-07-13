import React from "react";
import "./HelpCenter.css";
import { 
  FaBookOpen, 
  FaQuestionCircle, 
  FaPhone, 
  FaLink, 
  FaFileAlt, 
  FaGlobe,
  FaEnvelope,
  FaUserTie,
  FaComments
} from "react-icons/fa";

/**
 * Help Center Page: Provides basic FAQ and support contact details.
 */
function HelpCenter() {
  return (
    <div className="help-page-container">
      {/* Header Section */}
      <header className="header-section">
        <div className="header-content">
          <img src="/logo192.png" alt="Logo" className="header-logo" />
          <h1 className="header-title">𝐹𝒶𝓂𝑒</h1>
        </div>
      </header>

      {/* Help Content */}
      <div className="help-content">
        <h1 className="help-title">
          <FaBookOpen className="help-title-icon" />
          Help Center
        </h1>

        <div className="help-section">
          <h2 className="help-subtitle">
            <FaQuestionCircle className="help-subtitle-icon" />
            Frequently Asked Questions
          </h2>
          
          <div className="faq-item">
            <h3 className="faq-question">What is Fame?</h3>
            <p className="faq-answer">
              Think of Fame as your digital reputation scorecard. It's a reliable and easy way to build trust online,
              powered by you and your peers—no central authority involved. Your actions and contributions within the network 
              can earn you Fame or Defame, creating an immutable record of your trustworthiness.
            </p>
          </div>

          <div className="faq-item">
            <h3 className="faq-question">How do I increase my Fame level?</h3>
            <p className="faq-answer">
              Your Fame level increases as you actively engage in meaningful activities, such as completing successful deals,
              making valuable contributions, and building a strong reputation within your network. Additionally, your customers,
              clients, or connections can send you Fame as a recognition of your efforts, which further boosts your Fame level.
              The more impactful your actions and the stronger your relationships, the faster your Fame level will grow.
            </p>
          </div>

          <div className="faq-item">
            <h3 className="faq-question">Is my Fame linked to my Telegram account?</h3>
            <p className="faq-answer">
              Yes, your Fame level is tied to your Telegram ID, and reflected on the Blockchain, so no one can touch it.
            </p>
          </div>
        </div>

        <div className="help-section">
          <h2 className="help-subtitle">
            <FaPhone className="help-subtitle-icon" />
            Need Support?
          </h2>
          <p className="help-text">If you have any issues, feel free to contact us via Telegram:</p>
          <ul className="help-list">
            <li>
              <FaEnvelope className="contact-icon" />
              <a href="https://t.me/fames" target="_blank" rel="noopener noreferrer" className="help-link">
                @fames
              </a>
              <span className="contact-description">(General Support)</span>
            </li>
            <li>
              <FaUserTie className="contact-icon" />
              <a href="https://t.me/ton_fields" target="_blank" rel="noopener noreferrer" className="help-link">
                @ton_fields
              </a>
              <span className="contact-description">(Technical Help)</span>
            </li>
            <li>
              <FaComments className="contact-icon" />
              <a href="https://t.me/badihi" target="_blank" rel="noopener noreferrer" className="help-link">
                @badihi
              </a>
              <span className="contact-description">(Community Manager)</span>
            </li>
          </ul>
        </div>

        <div className="help-section">
          <h2 className="help-subtitle">
            <FaLink className="help-subtitle-icon" />
            External Resources
          </h2>
          <ul className="help-list">
            <li>
              <a href="https://telegra.ph/Hall-Of-Fame-09-24" target="_blank" rel="noopener noreferrer" className="help-link">
                <FaFileAlt className="link-icon" />
                White Paper
              </a>
            </li>
          </ul>
          <p className="help-text">For more information about Fame and the TON blockchain, visit:</p>
          <ul className="help-list">
            <li>
              <a href="https://ton.org" target="_blank" rel="noopener noreferrer" className="help-link">
                <FaGlobe className="link-icon" />
                TON Official Website
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default HelpCenter;
