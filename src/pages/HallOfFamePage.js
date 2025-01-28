import React from "react";
import { Link } from "react-router-dom";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "../firebase";
import "./HallOfFamePage.css"; // Import the CSS file


function HallOfFamePage() {
  const [members, setMembers] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState("");

  // For pagination
  const [currentPage, setCurrentPage] = React.useState(0);
  const pageSize = 10; // Number of users per page

  // Fallback image URL (replace with your chosen generic image URL)
  const fallbackImageUrl = "/favicon.ico"; 

  React.useEffect(() => {
    async function fetchHallOfFame() {
      try {
        // Reference the "Users" collection
        const colRef = collection(db, "Users");

        // Create a query to fetch all users, sorted by "fame" in descending order
        const fameQuery = query(colRef, orderBy("fame", "desc"));

        // Fetch documents from Firestore
        const snapshot = await getDocs(fameQuery);

        // Convert Firestore docs into an array of plain objects
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setMembers(data); // Set the fetched data to state
      } catch (err) {
        console.error("Firestore Error:", err);
        setError("Failed to load Hall of Fame data.");
      } finally {
        setLoading(false);
      }
    }

    fetchHallOfFame();
  }, []);

  // Calculate total pages based on the page size
  const totalPages = Math.ceil(members.length / pageSize);

  // Determine which members to display on the current page
  const startIndex = currentPage * pageSize;
  const displayedMembers = members.slice(startIndex, startIndex + pageSize);

  // Handlers for pagination
  const goToPreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="hall-of-fame-container">
      <h1>🏆 Hall of Fame 🏆</h1>

      {/* Loading or Error States */}
      {loading && <p className="loading-message">Loading...</p>}
      {error && <p className="error-message">{error}</p>}

      {/* If no users found */}
      {!loading && !error && members.length === 0 && (
        <p className="no-members-message">No members found in the Hall of Fame.</p>
      )}

      {/* Display each member’s data */}
      <div className="members-list">
        {displayedMembers.map((member) => (
          <div key={member.id} className="member-card">
            <img
              src={member.image_url || fallbackImageUrl}
              alt={member.first_name}
              className="member-image"
            />
            <div className="member-info">
              <h3 className="member-name">{member.first_name}</h3>
              <p className="member-fame">Fame: {member.fame}</p>
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
          &lt; Previous
        </button>
        <span className="page-info">Page {currentPage + 1} of {totalPages}</span>
        <button
          onClick={goToNextPage}
          disabled={currentPage === totalPages - 1}
          className="pagination-button"
        >
          Next &gt;
        </button>
      </div>

      <Link to="/" className="button-link">
        Back to Main Page
      </Link>
    </div>
  );
}

export default HallOfFamePage;