import { useState } from "react";
import supabase from "@/supabase/client";

const PROFESSION_IDS = {
  web: "06ebe4cf-2209-4b16-b8ce-ab42d25120b5",
  design: "b10b576c-1421-4a06-9605-268dda357da5"
};

export default function useSignup() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const associateCompanyTechnologies = async (companyId, techIds) => {
    if (!techIds || techIds.length === 0) return;
    
    try {
      const techData = techIds.map(techId => ({
        company_id: companyId,
        technology_id: techId
      }));
      
      const { error } = await supabase
        .from("company_technologies")
        .insert(techData);
        
      if (error) {
        console.error("Error associating technologies:", error);
      }
    } catch (err) {
      console.error("Error in technology association:", err);
    }
  };

  const associateStudentTechnologies = async (studentId, techIds) => {
    if (!techIds || techIds.length === 0) return;
    
    try {
      const techData = techIds.map(techId => ({
        student_id: studentId,
        technology_id: techId
      }));
      
      const { error } = await supabase
        .from("student_technologies")
        .insert(techData);
        
      if (error) {
        console.error("Error associating technologies:", error);
      }
    } catch (err) {
      console.error("Error in technology association:", err);
    }
  };

  const signup = async (formData) => {
    setLoading(true);
    setMessage("");

    try {
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
      });
      
      if (authError) {
        if (authError.message && (
            authError.message.includes("already registered") || 
            authError.message.includes("already exists") ||
            authError.message.includes("already taken"))) {
          throw new Error("E-postadressen är redan registrerad. Vänligen välj en annan adress eller försök logga in.");
        }
        throw authError;
      }
      
      if (!authData || !authData.user) {
        throw new Error("Kunde inte skapa användarkonto. Försök igen senare.");
      }
      
      const userId = authData.user.id;
      
      const { error: userError } = await supabase
        .from("users")
        .insert([{ 
          id: userId, 
          email: formData.email, 
          role: formData.role 
        }]);
      
      if (userError) throw userError;
      
      if (formData.role === "company") {
        const { data: companyData, error: companyError } = await supabase
          .from("companies")
          .insert([{
            user_id: userId,
            name: formData.name
          }])
          .select();
        
        if (companyError) throw companyError;
        
        if (formData.technologies && formData.technologies.length > 0) {
          await associateCompanyTechnologies(companyData[0].id, formData.technologies);
        }
      } else {
        const professionId = PROFESSION_IDS[formData.profession];
        
        if (!professionId) {
          throw new Error(`Profession ID not found for: ${formData.profession}`);
        }
        
        const { data: studentData, error: studentError } = await supabase
          .from("students")
          .insert([{ 
            user_id: userId, 
            name: formData.name, 
            website: formData.website, 
            profession_id: professionId
          }])
          .select();
        
        if (studentError) throw studentError;
        
        if (formData.technologies && formData.technologies.length > 0) {
          await associateStudentTechnologies(studentData[0].id, formData.technologies);
        }
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