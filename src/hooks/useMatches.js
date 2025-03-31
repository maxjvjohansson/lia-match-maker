import { useState, useEffect } from "react";
import { generateAllMatches, getTopMatchesForStudent, getTopMatchesForCompany } from "@/utils/matchingUtils";

export default function useMatches({ mode = "all", entityId = null, limit = 10 }) {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMatches = async () => {
      setLoading(true);
      try {
        let matchData;
        
        switch (mode) {
          case "student":
            matchData = await getTopMatchesForStudent(entityId, limit);
            break;
          case "company":
            matchData = await getTopMatchesForCompany(entityId, limit);
            break;
          case "all":
          default:
            matchData = await generateAllMatches();
            // If limit provided, slice the result
            if (limit && limit > 0) {
              matchData = matchData.slice(0, limit);
            }
            break;
        }
        
        setMatches(matchData);
        setError(null);
      } catch (err) {
        console.error("Error fetching matches:", err);
        setError("Failed to load matches. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchMatches();
  }, [mode, entityId, limit]);

  return { matches, loading, error };
}