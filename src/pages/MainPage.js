import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function MainPage() {
  return (
    <div className="page-container">
      <h1>Fames Community</h1>
      <p>Welcome to Fames Community!</p>

      {/* NFT Section */}
      <section className="section">
        <h2>NFT & Usernames</h2>
        <p>Explore our exclusive NFTs within the Fames Community. Visit our official Telegram NFT page:&nbsp;
          <a
            
            href="https://t.me/champions"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: '#229ED9', textDecoration: 'underline' }}
          >
            @champions
          </a>
        </p>
      </section>

      {/* News Section */}
      <section className="section">
        <h2>Latest News</h2>
        <p>Stay up to date with the latest happenings in our community.</p>
       
      </section>

      {/* Contact Us Section */}
      <section className="section">
        <h2>Contact Us</h2>
        <p>Have any questions or feedback? reach out on Telegram:</p>
        <p>
          <a
            href="https://t.me/fames"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: '#229ED9', textDecoration: 'underline', marginRight: '0.5rem' }}
          >
            @fames
          </a>
          |
          <a
            href="https://t.me/ton_fields"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: '#229ED9', textDecoration: 'underline', margin: '0 0.5rem' }}
          >
            @ton_fields
          </a>
          |
          <a
            href="https://t.me/badihi"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: '#229ED9', textDecoration: 'underline', marginLeft: '0.5rem' }}
          >
            @badihi
          </a>
        </p>
      </section>

      <Link to="/hall-of-fame" className="button-link">
        Go to Hall of Fame
      </Link>
    </div>
  );
}

export default MainPage;