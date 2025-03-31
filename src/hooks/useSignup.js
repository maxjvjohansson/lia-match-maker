import { useState } from "react";
import supabase from "@/supabase/client";

export default function useSignup() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Create auth user and profile
  const createUser = async (email, password) => {
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) throw error;
    return data.user.id;
  };

  // Insert into users table
  const createUserRecord = async (userId, email, role) => {
    const { error } = await supabase
      .from("users")
      .insert([{ id: userId, email, role }]);
    if (error) throw error;
  };

  // Create company record
  const createCompany = async (userId, name) => {
    const { error } = await supabase
      .from("companies")
      .insert([{ user_id: userId, name }]);
    if (error) throw error;
  };

  // Find profession by name
  const findProfession = async (professionName) => {
    const { data, error } = await supabase
      .from("professions")
      .select("id")
      .eq("name", professionName)
      .single();
    
    if (error) throw error;
    return data.id;
  };

  // Create student record
  const createStudent = async (userId, name, website, professionId) => {
    const { error } = await supabase
      .from("students")
      .insert([{ 
        user_id: userId, 
        name, 
        website, 
        profession_id: professionId 
      }]);
    if (error) throw error;
  };

  // Main signup function
  const signup = async (formData) => {
    setLoading(true);
    setMessage("");

    try {
      // Step 1: Create auth user
      const userId = await createUser(formData.email, formData.password);
      
      // Step 2: Create user record
      await createUserRecord(userId, formData.email, formData.role);
      
      // Step 3: Create role-specific record
      if (formData.role === "company") {
        await createCompany(userId, formData.name);
      } else {
        // Map profession selection to full name
        const professionName = formData.profession === "web" 
          ? "Webbutvecklare" 
          : "Digital Designer";
        
        // Get profession ID
        const professionId = await findProfession(professionName);
        
        // Create student record
        await createStudent(
          userId, 
          formData.name, 
          formData.website, 
          professionId
        );
      }
      
      setMessage("✅ Registrering lyckades!");
      return true;
    } catch (err) {
      console.error("Signup error:", err);
      setMessage(err.message || "❌ Ett fel inträffade vid registreringen.");
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { signup, loading, message, setMessage };
}