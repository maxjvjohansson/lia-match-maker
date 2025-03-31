import { useState, useEffect } from "react";
import { 
  generateAllMatches, 
  getTopMatchesForStudent, 
  getTopMatchesForCompany,
  generateAndSaveAllMatches
} from "@/utils/matchingUtils";
import "./MatchList.css";

/**
 * MatchList Component - Displays matches between students and companies
 * 
 * @param {Object} props
 * @param {string} props.mode - Type of matching to show: "all", "student", or "company"
 * @param {string} props.entityId - ID of student or company when mode is "student" or "company"
 * @param {number} props.limit - Maximum number of matches to display
 */
export default function MatchList({ mode = "all", entityId = null, limit = 10 }) {
  // State for matches data
  const [matches, setMatches] = useState([]);
  // Loading state for UI feedback
  const [loading, setLoading] = useState(true);
  // Error state to display any issues
  const [error, setError] = useState(null);
  // State for save operation status
  const [saveStatus, setSaveStatus] = useState(null);

  // Fetch matches when component mounts or when props change
  useEffect(() => {
    const fetchMatches = async () => {
      setLoading(true);
      try {
        let matchData;
        
        // Use different matching functions based on mode
        switch (mode) {
          // Get matches for a specific student
          case "student":
            matchData = await getTopMatchesForStudent(entityId, limit);
            break;
          // Get matches for a specific company
          case "company":
            matchData = await getTopMatchesForCompany(entityId, limit);
            break;
          // Get all matches by default
          case "all":
          default:
            matchData = await generateAllMatches();
            // Apply limit if provided
            if (limit && limit > 0) {
              matchData = matchData.slice(0, limit);
            }
            break;
        }
        
        setMatches(matchData || []);
      } catch (err) {
        console.error("Error fetching matches:", err);
        setError("Failed to load matches: " + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMatches();
  }, [mode, entityId, limit]);

  /**
   * Handler for saving all matches to the database
   */
  const handleSaveMatches = async () => {
    try {
      setSaveStatus("Saving matches...");
      await generateAndSaveAllMatches();
      setSaveStatus("All matches saved successfully!");
    } catch (error) {
      console.error("Error saving matches:", error);
      setSaveStatus("Error saving matches: " + error.message);
    }
  };

  // Show loading indicator while data is being fetched
  if (loading) return <p>Loading matches...</p>;
  
  return (
    <div className="match-list">
      {/* Dynamic title based on the current mode */}
      <h2>
        {mode === "student" ? "Top Companies for This Student" : 
         mode === "company" ? "Top Students for This Company" : 
         "All Matches"}
      </h2>
      
      {/* Button to save matches to database */}
      <div className="save-matches-container">
        <button 
          onClick={handleSaveMatches}
          className="save-button"
        >
          Save All Matches to Database
        </button>
        {saveStatus && (
          <span className="save-status">
            {saveStatus}
          </span>
        )}
      </div>
      
      {/* Show error message if there was a problem */}
      {error && <p className="error">{error}</p>}
      
      {/* Message when no matches are found */}
      {!error && matches.length === 0 && (
        <div className="no-matches">
          <p>No matches found.</p>
          <p>This could be because:</p>
          <ul>
            <li>No students or companies exist in the database</li>
            <li>No technology associations have been created</li>
            <li>There's an issue with the database query</li>
          </ul>
        </div>
      )}
      
      {/* Display the list of matches */}
      <div className="matches">
        {matches.map((match, index) => (
          <div key={`${match.studentId}-${match.companyId}`} className="match-card">
            {/* Match header with rank and score */}
            <div className="match-header">
              <div className="match-rank">{index + 1}</div>
              <div className="match-score">
                <span className="percentage">{match.score}%</span> match
              </div>
            </div>
            
            {/* Student and company details */}
            <div className="match-details">
              <div className="match-entity">
                <h3>Student</h3>
                <p className="entity-name">{match.studentName}</p>
              </div>
              
              <div className="match-entity">
                <h3>Company</h3>
                <p className="entity-name">{match.companyName}</p>
              </div>
            </div>
            
            {/* Matching technologies section */}
            <div className="match-technologies">
              <h4>Matching Technologies ({match.matchingTechCount}/{match.totalCompanyTechCount})</h4>
              {match.matchingTechnologies && match.matchingTechnologies.length > 0 ? (
                <ul>
                  {match.matchingTechnologies.map(tech => (
                    <li key={tech}>{tech}</li>
                  ))}
                </ul>
              ) : (
                <p>No matching technologies</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}