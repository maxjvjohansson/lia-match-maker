import { useState } from "react";
import supabase from "@/supabase/client";

// Hardcoded profession IDs based on your database
const PROFESSION_IDS = {
  web: "06ebe4cf-2209-4b16-b8ce-ab42d25120b5",
  design: "b10b576c-1421-4a06-9605-268dda357da5"
};

export default function useSignup() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const signup = async (formData) => {
    setLoading(true);
    setMessage("");

    try {
      console.log("Starting signup process for:", formData.role);
      
      // Step 1: Create auth user
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
      });
      
      if (authError) throw authError;
      
      const userId = authData.user.id;
      console.log("Created auth user with ID:", userId);
      
      // Step 2: Create user record
      const { error: userError } = await supabase
        .from("users")
        .insert([{ 
          id: userId, 
          email: formData.email, 
          role: formData.role 
        }]);
      
      if (userError) throw userError;
      console.log("Created user record in users table");
      
      // Step 3: Create role-specific record
      if (formData.role === "company") {
        // Company registration
        const { error: companyError } = await supabase
          .from("companies")
          .insert([{
            user_id: userId,
            name: formData.name
          }]);
        
        if (companyError) throw companyError;
        console.log("Created company record successfully");
        
      } else {
        // Student registration - Use hardcoded profession ID directly
        const professionId = PROFESSION_IDS[formData.profession];
        
        if (!professionId) {
          throw new Error(`Profession ID not found for: ${formData.profession}`);
        }
        
        console.log("Using profession ID:", professionId);
        
        // Create student record
        const { error: studentError } = await supabase
          .from("students")
          .insert([{ 
            user_id: userId, 
            name: formData.name, 
            website: formData.website, 
            profession_id: professionId
          }]);
        
        if (studentError) throw studentError;
        console.log("Created student record successfully");
      }
      
      setMessage("✅ Registrering lyckades!");
      return true;
    } catch (err) {
      console.error("❌ Signup error:", err);
      setMessage(err.message || "❌ Ett fel inträffade vid registreringen.");
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { signup, loading, message, setMessage };
}