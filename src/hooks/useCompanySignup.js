import { useState } from "react";
import supabase from "@/supabase/client";

export default function useCompanySignup() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const signup = async ({ email, companyName, password }) => {
    setLoading(true);
    setMessage("");

    try {
      const payload = {
        email,
        password,
        role: "company",
      };
      console.log("🚀 Insert payload:", payload);

      const { data: userData, error: userError } = await supabase
        .from("users")
        .insert([payload])
        .select()
        .single();

      console.log("🧾 Supabase user insert result:", { userData, userError });

      if (userError) throw userError;
      if (!userData) throw new Error("❌ Insert failed: No user returned");

      const { error: companyError } = await supabase
        .from("companies")
        .insert([{ name: companyName, user_id: userData.id }]);

      console.log("🏢 Company insert result:", { companyError });

      if (companyError) throw companyError;

      setMessage("✅ Företaget har registrerats!");
      return true;
    } catch (err) {
      console.error("❌ Signup error:", err);
      setMessage(`❌ ${err.message}`);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { signup, loading, message, setMessage };
}
