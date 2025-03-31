import { useState, useEffect } from "react";
import supabase from "@/supabase/client";

const mockTechnologies = {
  web: [
    { id: "web-1", name: "one" },
    { id: "web-2", name: "two" },
    { id: "web-3", name: "three" },
    { id: "web-4", name: "four" },
    { id: "web-5", name: "five" },
    { id: "web-6", name: "six" }
  ],
  design: [
    { id: "design-1", name: "seven" },
    { id: "design-2", name: "eight" },
    { id: "design-3", name: "nine" },
    { id: "design-4", name: "ten" },
    { id: "design-5", name: "eleven" },
    { id: "design-6", name: "twelve" }
  ]
};

export default function useTechnologies(profession) {
  const [technologies, setTechnologies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [useMock, setUseMock] = useState(false);

  useEffect(() => {
    setTechnologies([]);
    setError(null);
    setUseMock(false);
    
    if (!profession) {
      return;
    }

    async function fetchTechnologies() {
      setLoading(true);
      
      try {
        console.log("Fetching technologies for profession:", profession);
        
        const { data, error } = await supabase
          .from("technologies")
          .select("*");
          
        if (error) {
          console.error("Error fetching technologies:", error);
          throw error;
        }
        
        console.log("Technologies from database:", data);
        
        if (!data || data.length === 0) {
          console.log("No technologies found in database, using mock data");
          setUseMock(true);
          setTechnologies(mockTechnologies[profession] || []);
        } else {
          setTechnologies(data);
        }
      } catch (err) {
        console.error("Error in useTechnologies:", err);
        setError(err.message);
        
        console.log("Using mock data due to error");
        setUseMock(true);
        setTechnologies(mockTechnologies[profession] || []);
      } finally {
        setLoading(false);
      }
    }

    fetchTechnologies();
  }, [profession]);

  return { 
    technologies, 
    loading, 
    error, 
    useMock 
  };
}