"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import supabase from "@/utils/supabase/client";

export default function useSignupForm(defaultRole = "company") {
  const router = useRouter();
  const MAX_TECH_SELECTIONS = 6;

  const [role, setRole] = useState(defaultRole);
  const [companyName, setCompanyName] = useState("");
  const [studentName, setStudentName] = useState("");
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isChecked, setIsChecked] = useState(false);

  const [selectedProfessions, setSelectedProfessions] = useState([]);
  const [selectedProfessionIds, setSelectedProfessionIds] = useState([]);
  const [activeProfessionId, setActiveProfessionId] = useState(null);

  const [visibleTechPickers, setVisibleTechPickers] = useState([]);

  const [loading, setLoading] = useState(false);
  const [formMessage, setFormMessage] = useState("");

  const [professions, setProfessions] = useState([]);
  const [technologies, setTechnologies] = useState({});
  const [selectedTechs, setSelectedTechs] = useState([]);

  useEffect(() => {
    setRole(defaultRole);
  }, [defaultRole]);

  useEffect(() => {
    const fetchProfessions = async () => {
      try {
        const { data, error } = await supabase
          .from("professions")
          .select("id, name");

        if (error) throw error;
        setProfessions(data || []);
      } catch (error) {
        console.error("Error fetching professions:", error);
        setFormMessage("Kunde inte ladda yrken. Försök igen senare.");
      }
    };

    fetchProfessions();
  }, []);

  useEffect(() => {
    const fetchTechnologies = async (professionId) => {
      if (!professionId) return;

      try {
        if (technologies[professionId]) return;

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
        console.error("Error fetching technologies:", error.message);
        setFormMessage("Kunde inte ladda teknologier. Försök igen senare.");
      }
    };

    selectedProfessionIds.forEach((id) => fetchTechnologies(id));
  }, [selectedProfessionIds]);

  const handleRoleChange = (newRole) => {
    setRole(newRole);
    setSelectedProfessions([]);
    setSelectedProfessionIds([]);
    setVisibleTechPickers([]);
    setSelectedTechs([]);

    if (newRole === "company") {
      setStudentName("");
      setWebsite("");
    } else {
      setCompanyName("");
    }
  };

  const toggleProfession = async (professionName, professionId) => {
    try {
      if (role === "student") {
        if (selectedProfessions.includes(professionName)) {
          setSelectedProfessions([]);
          setSelectedProfessionIds([]);
          setVisibleTechPickers([]);
          setSelectedTechs([]);
        } else {
          setSelectedProfessions([professionName]);
          setSelectedProfessionIds([professionId]);
          setVisibleTechPickers([professionId]);
          setActiveProfessionId(professionId);
        }
      } else {
        if (selectedProfessions.includes(professionName)) {
          setSelectedProfessions((prev) =>
            prev.filter((p) => p !== professionName)
          );
          setSelectedProfessionIds((prev) =>
            prev.filter((id) => id !== professionId)
          );
          setVisibleTechPickers((prev) =>
            prev.filter((id) => id !== professionId)
          );

          setSelectedTechs((prev) =>
            prev.filter((tech) => tech.professionId !== professionId)
          );
        } else {
          setSelectedProfessions((prev) => [...prev, professionName]);
          setSelectedProfessionIds((prev) => [...prev, professionId]);
          setVisibleTechPickers((prev) => [...prev, professionId]);
          setActiveProfessionId(professionId);
        }
      }
    } catch (err) {
      console.error("Error handling profession toggle:", err.message);
      setFormMessage("Ett fel uppstod vid val av yrkesgrupp.");
    }
  };

  const toggleTech = (techId, professionId) => {
    const isSelected = selectedTechs.some((tech) => tech.id === techId);

    if (isSelected) {
      setSelectedTechs((prev) => prev.filter((tech) => tech.id !== techId));
    } else {
      if (selectedTechs.length >= MAX_TECH_SELECTIONS) {
        setFormMessage(`Du kan välja max ${MAX_TECH_SELECTIONS} tekniker.`);
        return;
      }

      setSelectedTechs((prev) => [...prev, { id: techId, professionId }]);
    }
  };

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const validateForm = () => {
    if (role === "company" && !companyName) {
      setFormMessage("Företagsnamn är obligatoriskt.");
      return false;
    }

    if (role === "student" && !studentName) {
      setFormMessage("Namn är obligatoriskt.");
      return false;
    }

    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setFormMessage("Vänligen ange en giltig e-postadress.");
      return false;
    }

    if (role === "student" && !website) {
      setFormMessage("Hemsida/portfolio är obligatorisk för studenter.");
      return false;
    }

    if (!password || password.length < 6) {
      setFormMessage("Lösenord måste vara minst 6 tecken.");
      return false;
    }

    if (password !== confirmPassword) {
      setFormMessage("Lösenorden matchar inte.");
      return false;
    }

    if (selectedProfessionIds.length === 0) {
      setFormMessage(
        role === "company" ? "Välj vilka ni tar emot." : "Välj vad du studerar."
      );
      return false;
    }

    if (!isChecked) {
      setFormMessage("Du måste godkänna användarvillkoren.");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);
    setFormMessage("");

    try {
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            role: role,
          },
        },
      });

      if (authError || !authData.user) {
        throw new Error(
          authError?.message || "Misslyckades att skapa användare."
        );
      }

      const userId = authData.user.id;

      if (role === "student") {
        try {
          const { data: studentData, error: studentError } = await supabase
            .from("students")
            .insert({
              user_id: userId,
              name: studentName,
              profession_id: selectedProfessionIds[0],
              website: website,
            })
            .select("id");

          if (studentError || !studentData || studentData.length === 0) {
            await supabase.auth.admin.deleteUser(userId);
            throw new Error(
              studentError?.message || "Misslyckades att skapa student."
            );
          }

          const studentId = studentData[0].id;

          if (selectedTechs.length > 0) {
            const studentTechLinks = selectedTechs.map((tech) => ({
              student_id: studentId,
              technology_id: tech.id,
            }));

            const { error: studentTechError } = await supabase
              .from("student_technologies")
              .insert(studentTechLinks);

            if (studentTechError) {
              await supabase.auth.admin.deleteUser(userId);
              throw new Error(
                studentTechError?.message ||
                  "Misslyckades att lägga till tekniker."
              );
            }
          }
        } catch (error) {
          await supabase.auth.admin.deleteUser(userId);
          throw error;
        }
      } else {
        try {
          const { data: companyData, error: companyError } = await supabase
            .from("companies")
            .insert({
              user_id: userId,
              name: companyName,
            })
            .select("id");

          if (companyError || !companyData || companyData.length === 0) {
            await supabase.auth.admin.deleteUser(userId);
            throw new Error(
              companyError?.message || "Misslyckades att skapa företag."
            );
          }

          const companyId = companyData[0].id;

          if (selectedProfessionIds.length > 0) {
            const companyProfessionLinks = selectedProfessionIds.map(
              (profId) => ({
                company_id: companyId,
                profession_id: profId,
              })
            );

            const { error: companyProfessionError } = await supabase
              .from("company_professions")
              .insert(companyProfessionLinks);

            if (companyProfessionError) {
              await supabase.auth.admin.deleteUser(userId);
              throw new Error(
                companyProfessionError?.message ||
                  "Misslyckades att lägga till företagsprofessioner."
              );
            }
          }

          if (selectedTechs.length > 0) {
            const companyTechLinks = selectedTechs.map((tech) => ({
              company_id: companyId,
              technology_id: tech.id,
            }));

            const { error: companyTechError } = await supabase
              .from("company_technologies")
              .insert(companyTechLinks);

            if (companyTechError) {
              await supabase.auth.admin.deleteUser(userId);
              throw new Error(
                companyTechError?.message ||
                  "Misslyckades att lägga till företagstekniker."
              );
            }
          }
        } catch (error) {
          await supabase.auth.admin.deleteUser(userId);
          throw error;
        }
      }

      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (signInError) throw signInError;

      document.cookie = "just_registered=true; path=/; max-age=60";

      setFormMessage("Registrering lyckades! Omdirigerar...");
      router.push("/confirmation");
    } catch (error) {
      console.error("Registrering misslyckades:", error.message);
      setFormMessage("Registrering misslyckades: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    role,
    setRole,
    companyName,
    setCompanyName,
    studentName,
    setStudentName,
    email,
    setEmail,
    website,
    setWebsite,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    isChecked,
    setIsChecked,
    selectedProfessions,
    setSelectedProfessions,
    selectedProfessionIds,
    setSelectedProfessionIds,
    visibleTechPickers,
    setVisibleTechPickers,
    technologies,
    selectedTechs,
    setSelectedTechs,
    professions,
    loading,
    formMessage,
    handleRoleChange,
    toggleProfession,
    toggleTech,
    handleCheckboxChange,
    validateForm,
    handleSubmit,
    MAX_TECH_SELECTIONS,
  };
}
