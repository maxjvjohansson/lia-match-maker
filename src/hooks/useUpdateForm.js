"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import supabase from "@/utils/supabase/client";
import useAuth from "@/hooks/useAuth";

export default function useUpdateForm() {
  const { user } = useAuth();
  const router = useRouter();
  const MAX_TECH_SELECTIONS = 6;

  const [role, setRole] = useState(null);
  const [profileId, setProfileId] = useState(null);
  const [studentName, setStudentName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [website, setWebsite] = useState("");
  const [email, setEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [professions, setProfessions] = useState([]);
  const [technologies, setTechnologies] = useState({});
  const [selectedProfessionIds, setSelectedProfessionIds] = useState([]);
  const [visibleTechPickers, setVisibleTechPickers] = useState([]);
  const [selectedTechs, setSelectedTechs] = useState([]);

  const [formMessage, setFormMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user) return;

    setEmail(user.email);
    const userRole = user.user_metadata.role;
    setRole(userRole);

    const fetchInitialData = async () => {
      try {
        const { data: fetchedProfessions } = await supabase
          .from("professions")
          .select("*");
        setProfessions(fetchedProfessions || []);

        const { data: profile, error: profileError } = await supabase
          .from(userRole === "student" ? "students" : "companies")
          .select("*")
          .eq("user_id", user.id)
          .single();

        if (profileError || !profile) {
          console.error("Failed to fetch profile:", profileError?.message);
          setFormMessage("Kunde inte hämta din profil.");
          return;
        }

        setProfileId(profile.id);

        if (userRole === "student") {
          setStudentName(profile.name);
          setWebsite(profile.website || "");
          setSelectedProfessionIds([profile.profession_id]);
          setVisibleTechPickers([profile.profession_id]);
        } else {
          setCompanyName(profile.name);
          const { data: profs } = await supabase
            .from("company_professions")
            .select("profession_id")
            .eq("company_id", profile.id);
          const profIds = profs.map((p) => p.profession_id);
          setSelectedProfessionIds(profIds);
          setVisibleTechPickers(profIds);
        }

        const techs = await fetchTechLinks(userRole, profile.id);
        setSelectedTechs(techs);
      } catch (err) {
        console.error("Initialization error:", err.message);
        setFormMessage("Ett fel uppstod vid laddning.");
      }
    };

    fetchInitialData();
  }, [user]);

  useEffect(() => {
    const fetchTechnologies = async (professionId) => {
      if (!professionId || technologies[professionId]) return;

      try {
        const { data, error } = await supabase
          .from("technologies")
          .select("*")
          .eq("profession_id", professionId);

        if (error) throw error;

        setTechnologies((prev) => ({
          ...prev,
          [professionId]: data || [],
        }));
      } catch (error) {
        console.error("Failed to fetch technologies:", error.message);
        setFormMessage("Kunde inte ladda tekniker.");
      }
    };

    selectedProfessionIds.forEach((id) => fetchTechnologies(id));
  }, [selectedProfessionIds, technologies]);

  const fetchTechLinks = async (role, id) => {
    const table =
      role === "student" ? "student_technologies" : "company_technologies";
    const profileKey = role === "student" ? "student_id" : "company_id";

    const { data, error } = await supabase
      .from(table)
      .select(
        `
        technology_id,
        technology:technologies (
          name,
          profession_id
        )
      `
      )
      .eq(profileKey, id);

    if (error) {
      console.error("Failed to fetch tech links:", error.message);
      return [];
    }

    return data.map((item) => ({
      id: item.technology_id,
      name: item.technology.name,
      professionId: item.technology.profession_id,
    }));
  };

  const toggleProfession = (professionId) => {
    if (role === "student") {
      setSelectedProfessionIds([professionId]);
      setVisibleTechPickers([professionId]);
    } else {
      const isSelected = selectedProfessionIds.includes(professionId);
      const updated = isSelected
        ? selectedProfessionIds.filter((id) => id !== professionId)
        : [...selectedProfessionIds, professionId];

      setSelectedProfessionIds(updated);
      setVisibleTechPickers(updated);
      setSelectedTechs((prev) =>
        prev.filter((t) => updated.includes(t.professionId))
      );
    }
  };

  const toggleTech = (techId, professionId, techName) => {
    const isSelected = selectedTechs.some((t) => t.id === techId);

    if (isSelected) {
      setSelectedTechs((prev) => prev.filter((t) => t.id !== techId));
    } else {
      if (selectedTechs.length >= MAX_TECH_SELECTIONS) {
        setFormMessage(`Max ${MAX_TECH_SELECTIONS} tekniker.`);
        return;
      }
      setSelectedTechs((prev) => [
        ...prev,
        { id: techId, professionId, name: techName },
      ]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormMessage("");
    setLoading(true);

    try {
      if (!profileId) {
        console.error("Missing profileId – cannot update techs.");
        setFormMessage("Kunde inte uppdatera tekniker.");
        return;
      }

      const anyPasswordFieldFilled =
        currentPassword || newPassword || confirmPassword;

      if (anyPasswordFieldFilled) {
        if (!currentPassword || !newPassword || !confirmPassword) {
          setFormMessage("Alla lösenordsfält måste fyllas i.");
          setLoading(false);
          return;
        }

        if (newPassword !== confirmPassword) {
          setFormMessage("Lösenorden matchar inte.");
          setLoading(false);
          return;
        }

        const { error: signInError } = await supabase.auth.signInWithPassword({
          email,
          password: currentPassword,
        });

        if (signInError) {
          setFormMessage("Fel nuvarande lösenord.");
          setLoading(false);
          return;
        }

        const { error: pwError } = await supabase.auth.updateUser({
          password: newPassword,
        });

        if (pwError) {
          setFormMessage("Kunde inte uppdatera lösenordet.");
          setLoading(false);
          return;
        }
      }

      const profileTable = role === "student" ? "students" : "companies";
      const profileUpdate =
        role === "student"
          ? {
              name: studentName,
              website,
              profession_id: selectedProfessionIds[0],
            }
          : { name: companyName };

      const { error: updateError } = await supabase
        .from(profileTable)
        .update(profileUpdate)
        .eq("user_id", user.id);

      if (updateError) throw updateError;

      if (role === "company") {
        await supabase
          .from("company_professions")
          .delete()
          .eq("company_id", profileId);

        const newProfessions = selectedProfessionIds.map((id) => ({
          company_id: profileId,
          profession_id: id,
        }));

        const { error: insertProfError } = await supabase
          .from("company_professions")
          .insert(newProfessions);
        if (insertProfError) throw insertProfError;
      }

      const techTable =
        role === "student" ? "student_technologies" : "company_technologies";
      const profileKey = role === "student" ? "student_id" : "company_id";

      await supabase.from(techTable).delete().eq(profileKey, profileId);

      if (selectedTechs.length > 0) {
        const techLinks = selectedTechs.map((t) => ({
          [profileKey]: profileId,
          technology_id: t.id,
        }));
        const { error: techError } = await supabase
          .from(techTable)
          .insert(techLinks);
        if (techError) throw techError;
      }

      setFormMessage("Profilen har uppdaterats!");

      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err) {
      console.error("Error updating profile:", err.message);
      setFormMessage("Kunde inte spara ändringar.");
    } finally {
      setLoading(false);
    }
  };

  return {
    role,
    studentName,
    setStudentName,
    companyName,
    setCompanyName,
    website,
    setWebsite,
    email,
    professions,
    technologies,
    selectedProfessionIds,
    visibleTechPickers,
    selectedTechs,
    formMessage,
    loading,
    toggleProfession,
    toggleTech,
    handleSubmit,
    MAX_TECH_SELECTIONS,
    currentPassword,
    setCurrentPassword,
    newPassword,
    setNewPassword,
    confirmPassword,
    setConfirmPassword,
  };
}
