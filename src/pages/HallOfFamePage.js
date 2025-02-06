import React, { useState, useEffect } from "react";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "../firebase";
import "./HallOfFamePage.css";
import HelpCenter from "./HelpCenter"; // Import the HelpCenter component
import ProfileTab from "./ProfileTab"; // Import the ProfileTab component

function HallOfFamePage() {
  const [activeTab, setActiveTab] = useState("hallOfFame");
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [searchQuery, setSearchQuery] = useState(""); // State for search query
  const pageSize = 10; // users per page
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

  // Filter members based on search query
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
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(0); // Reset to the first page when searching
              }}
              className="search-input"
            />
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
                  <p className="member-fame">Fame: {member.fame}</p>
                </div>

                {/* Fame & Defame Buttons */}
                <div className="fame-buttons">
                  <a
                    href={`https://app.tonkeeper.com/transfer/EQABn05Gcmt4coTmfOMCg8nf7vL1c_JL56L42F4dIOl3P8HJ?amount=100000000&text=F${member.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="fame-button"
                  >
                    +
                  </a>

                  <a
                    href={`https://app.tonkeeper.com/transfer/EQABn05Gcmt4coTmfOMCg8nf7vL1c_JL56L42F4dIOl3P8HJ?amount=100000000&text=D${member.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="fame-button"
                  >
                    -
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination Controls */}
          <div className="pagination-controls">
            <button
              onClick={goToPreviousPage}
              disabled={currentPage === 0}
              className="pagination-button"
            >
              Previous
            </button>

            <span className="page-info">
              Page {currentPage + 1} of {totalPages}
            </span>

            <button
              onClick={goToNextPage}
              disabled={currentPage === totalPages - 1}
              className="pagination-button"
            >
              Next
            </button>
          </div>

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
        <div className="bottom-menu-item" onClick={() => setActiveTab("profile")}>
          🪪 Profile
        </div>
        <div className="bottom-menu-item" onClick={() => setActiveTab("hallOfFame")}>
          🏆 Hall of Fame
        </div>
        <div className="bottom-menu-item" onClick={() => setActiveTab("help")}>
          ℹ️ Help Center
        </div>
      </div>
    </div>
  );
}

export default HallOfFamePage;
