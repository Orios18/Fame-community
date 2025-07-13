import React, { useState, useEffect } from "react";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "../firebase";
import "./HallOfFamePage.css";
import HelpCenter from "./HelpCenter";
import ProfileTab from "./ProfileTab";
import { 
  FaTrophy, 
  FaSearch, 
  FaPlus, 
  FaMinus, 
  FaChevronLeft, 
  FaChevronRight,
  FaIdCard,
  FaQuestionCircle
} from "react-icons/fa";

function HallOfFamePage() {
  const [activeTab, setActiveTab] = useState("hallOfFame");
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const pageSize = 10;
  const fallbackImageUrl = "/favicon.ico";

  useEffect(() => {
    async function fetchHallOfFame() {
      try {
        const colRef = collection(db, "Users");
        const fameQuery = query(colRef, orderBy("fame", "desc"));
        const snapshot = await getDocs(fameQuery);
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setMembers(data);
      } catch (err) {
        console.error("Firestore Error:", err);
        setError("Failed to load Hall of Fame data.");
      } finally {
        setLoading(false);
      }
    }

    if (activeTab === "hallOfFame") {
      fetchHallOfFame();
    }
  }, [activeTab]);

  const filteredMembers = members.filter((member) => {
    const fullName = `${member.first_name} ${member.last_name || ""}`.toLowerCase();
    const username = member.username ? member.username.toLowerCase() : "";
    const query = searchQuery.toLowerCase();
    return fullName.includes(query) || username.includes(query);
  });

  const totalPages = Math.ceil(filteredMembers.length / pageSize);
  const startIndex = currentPage * pageSize;
  const displayedMembers = filteredMembers.slice(startIndex, startIndex + pageSize);

  const goToPreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const goToNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  function renderContent() {
    if (activeTab === "hallOfFame") {
      return (
        <div>
          <h1> 𝐇𝐚𝐥𝐥 𝐨𝐟 𝐟𝐚𝐦𝐞 </h1>

          {/* Search Input */}
          <div className="search-container">
            <div className="search-input-wrapper">
              <FaSearch className="search-icon" />
              <input
                type="text"
                placeholder="Search members..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(0);
                }}
                className="search-input"
              />
            </div>
          </div>

          {loading && <p className="loading-message">Loading...</p>}
          {error && <p className="error-message">{error}</p>}

          {!loading && !error && filteredMembers.length === 0 && (
            <p className="no-members-message">
              No members found matching your search.
            </p>
          )}

          <div className="members-list">
            {displayedMembers.map((member) => (
              <div key={member.id} className="member-card">
                {/* Profile Picture */}
                <img
                  src={member.image_url || fallbackImageUrl}
                  alt={member.first_name}
                  className="member-image"
                />

                {/* Name & Fame Level */}
                <div className="member-info">
                  <h3 className="member-name">{member.first_name}</h3>
                  <p className="member-fame">
                    <FaTrophy className="fame-icon" />
                    Fame: {member.fame}
                  </p>
                </div>

                {/* Fame & Defame Buttons */}
                <div className="fame-buttons">
                  <a
                    href={`https://app.tonkeeper.com/transfer/EQABn05Gcmt4coTmfOMCg8nf7vL1c_JL56L42F4dIOl3P8HJ?amount=100000000&text=F${member.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="fame-button fame-button-plus"
                    title="Give Fame"
                  >
                    <FaPlus />
                  </a>

                  <a
                    href={`https://app.tonkeeper.com/transfer/EQABn05Gcmt4coTmfOMCg8nf7vL1c_JL56L42F4dIOl3P8HJ?amount=100000000&text=D${member.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="fame-button fame-button-minus"
                    title="Give Defame"
                  >
                    <FaMinus />
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="pagination-controls">
              <button
                onClick={goToPreviousPage}
                disabled={currentPage === 0}
                className="pagination-button"
                title="Previous page"
              >
                <FaChevronLeft />
                <span className="pagination-text">Previous</span>
              </button>

              <div className="page-info">
                <span className="page-numbers">
                  {currentPage + 1} of {totalPages}
                </span>
              </div>

              <button
                onClick={goToNextPage}
                disabled={currentPage === totalPages - 1}
                className="pagination-button"
                title="Next page"
              >
                <span className="pagination-text">Next</span>
                <FaChevronRight />
              </button>
            </div>
          )}
        </div>
      );
    } else if (activeTab === "profile") {
      return <ProfileTab />;
    } else if (activeTab === "help") {
      return <HelpCenter />;
    }
  }

  return (
    <div className="hall-of-fame-container">
      {/* Header Section */}
      <header className="header-section">
        <div className="header-content">
          <img src="/logo192.png" alt="Logo" className="header-logo" />
          <h1 className="header-title">𝐹𝒶𝓂𝑒</h1>
        </div>
      </header>

      {/* Render whichever tab is active */}
      {renderContent()}

      {/* Bottom menu with 3 items */}
      <div className="bottom-menu">
        <div 
          className={`bottom-menu-item ${activeTab === "profile" ? "active" : ""}`} 
          onClick={() => setActiveTab("profile")}
        >
          <FaIdCard className="menu-icon" />
          <span className="menu-text">Profile</span>
        </div>
        <div 
          className={`bottom-menu-item ${activeTab === "hallOfFame" ? "active" : ""}`} 
          onClick={() => setActiveTab("hallOfFame")}
        >
          <FaTrophy className="menu-icon" />
          <span className="menu-text">Hall of Fame</span>
        </div>
        <div 
          className={`bottom-menu-item ${activeTab === "help" ? "active" : ""}`} 
          onClick={() => setActiveTab("help")}
        >
          <FaQuestionCircle className="menu-icon" />
          <span className="menu-text">Help</span>
        </div>
      </div>
    </div>
  );
}

export default HallOfFamePage;
