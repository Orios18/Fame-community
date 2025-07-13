import React, { useState, useEffect } from "react";
import { collection, getDocs, query, orderBy, limit } from "firebase/firestore";
import { db } from "../firebase";
import "./LandingPage.css";
import { 
  FaTrophy, 
  FaCrown, 
  FaStar, 
  FaMedal,
  FaArrowRight,
  FaUsers,
  FaChartLine
} from "react-icons/fa";

function LandingPage() {
  const [topUsers, setTopUsers] = useState([]);
  const [communityStats, setCommunityStats] = useState({
    totalMembers: 0,
    totalFame: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const fallbackImageUrl = "/favicon.ico";

  useEffect(() => {
    async function fetchData() {
      try {
        const colRef = collection(db, "Users");
        
        // Fetch top 5 users
        const fameQuery = query(colRef, orderBy("fame", "desc"), limit(5));
        const snapshot = await getDocs(fameQuery);
        const topData = snapshot.docs.map((doc, index) => ({
          id: doc.id,
          rank: index + 1,
          ...doc.data(),
        }));
        setTopUsers(topData);

        // Fetch all users for community stats
        const allUsersQuery = query(colRef, orderBy("fame", "desc"));
        const allUsersSnapshot = await getDocs(allUsersQuery);
        const allUsers = allUsersSnapshot.docs.map(doc => doc.data());
        
        // Calculate community statistics
        const totalMembers = allUsers.length;
        const totalFame = allUsers.reduce((sum, user) => sum + (user.fame || 0), 0);

        setCommunityStats({
          totalMembers,
          totalFame
        });

      } catch (err) {
        console.error("Firestore Error:", err);
        setError("Failed to load community data.");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const getRankIcon = (rank) => {
    switch (rank) {
      case 1:
        return <FaCrown className="rank-icon gold" />;
      case 2:
        return <FaMedal className="rank-icon silver" />;
      case 3:
        return <FaMedal className="rank-icon bronze" />;
      default:
        return <FaStar className="rank-icon" />;
    }
  };

  const getRankClass = (rank) => {
    switch (rank) {
      case 1:
        return "rank-1";
      case 2:
        return "rank-2";
      case 3:
        return "rank-3";
      case 4:
        return "rank-4";
      case 5:
        return "rank-5";
      default:
        return "rank-other";
    }
  };

  if (loading) {
    return (
      <div className="landing-container">
        <div className="loading-section">
          <div className="loading-spinner"></div>
          <p>Loading community data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="landing-container">
        <div className="error-section">
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="landing-container">

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">
            <FaTrophy className="hero-icon" />
            Fame Community
          </h1>
          <p className="hero-subtitle">
            Discover the most trusted members of our community
          </p>
          <div className="hero-stats">
            <div className="stat-item">
              <FaUsers className="stat-icon" />
              <span className="stat-number">{communityStats.totalMembers}</span>
              <span className="stat-label">Total Community Members</span>
            </div>
            <div className="stat-item">
              <FaChartLine className="stat-icon" />
              <span className="stat-number">{communityStats.totalFame}</span>
              <span className="stat-label">Total Fame</span>
            </div>
          </div>
        </div>
      </section>

      {/* Top Users Section */}
      <section className="top-users-section">
        <h2 className="section-title">
          <FaCrown className="section-icon" />
          Top 5 Fame Leaders
        </h2>
        
        <div className="top-users-grid">
          {topUsers.map((user) => (
            <div key={user.id} className={`user-card ${getRankClass(user.rank)}`}>
              <div className="user-rank">
                {getRankIcon(user.rank)}
                <span className="rank-number">#{user.rank}</span>
              </div>
              
              <div className="user-avatar">
                <img
                  src={user.image_url || fallbackImageUrl}
                  alt={user.first_name}
                  className="avatar-image"
                />
                <div className="rank-badge">
                  {getRankIcon(user.rank)}
                </div>
              </div>
              
              <div className="user-info">
                <h3 className="user-name">{user.first_name}</h3>
                <p className="user-fame">
                  <FaTrophy className="fame-icon" />
                  {user.fame || 0} Fame Points
                </p>
                {user.username && (
                  <p className="user-username">@{user.username}</p>
                )}
              </div>
              
              <div className="user-actions">
                <a
                  href={`https://app.tonkeeper.com/transfer/EQABn05Gcmt4coTmfOMCg8nf7vL1c_JL56L42F4dIOl3P8HJ?amount=100000000&text=F${user.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="fame-button"
                  title="Give Fame"
                >
                  <FaTrophy />
                  Give Fame
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="cta-section">
        <div className="cta-content">
          <h2 className="cta-title">Join the Fame Community</h2>
          <p className="cta-description">
            Build your reputation and earn fame points by contributing to the community.
            Start your journey today!
          </p>
          <div className="cta-buttons">
            <a href="/hall-of-fame" className="cta-button primary">
              View Full Hall of Fame
              <FaArrowRight className="button-icon" />
            </a>
            <button className="cta-button secondary">
              Learn More
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default LandingPage; 