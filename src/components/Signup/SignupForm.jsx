"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import "./SignupForm.css";
import InputField from "./Form/InputField";
import FormMessage from "./Form/FormMessage";
import Button from "@/components/Button/Button";
import FormButton from "../Button/FormButton";
import Link from "next/link";
import Checkbox from "../Checkbox/Checkbox";
import supabase from "@/utils/supabase/client";

export default function SignupForm() {
  const router = useRouter();

  const [role, setRole] = useState("company");
  const [companyName, setCompanyName] = useState("");
  const [studentName, setStudentName] = useState("");
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [profession, setProfession] = useState("");
  const [professionId, setProfessionId] = useState(null);
  const [isChecked, setIsChecked] = useState(false);

  const [loading, setLoading] = useState(false);
  const [formMessage, setFormMessage] = useState("");

  const [professions, setProfessions] = useState([]);
  const [technologies, setTechnologies] = useState([]);
  const [selectedTechs, setSelectedTechs] = useState([]);

  useEffect(() => {
    const fetchProfessions = async () => {
      try {
        const { data, error } = await supabase.from("professions").select("*");

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
    const fetchTechnologies = async () => {
      if (!professionId) return;

      try {
        const { data, error } = await supabase
          .from("technologies")
          .select("*")
          .eq("profession_id", professionId);

        if (error) throw error;

        if (data.length === 0) {
        } else {
          setTechnologies(data || []);
        }
      } catch (error) {
        console.error("Error fetching technologies:", error.message);
        setFormMessage("Kunde inte ladda teknologier. Försök igen senare.");
      }
    };

    fetchTechnologies();
  }, [professionId]);

  const handleRoleChange = (newRole) => {
    setRole(newRole);
    if (newRole === "company") {
      setStudentName("");
      setWebsite("");
    } else {
      setCompanyName("");
    }
  };

  const toggleProfession = async (professionName) => {
    try {
      const { data, error } = await supabase
        .from("professions")
        .select("id")
        .eq("name", professionName);

      if (error) throw new Error(error.message);
      if (!data || data.length === 0)
        throw new Error("Kunde inte hitta yrkesgruppen.");

      setProfession(professionName);
      setProfessionId(data[0].id);
    } catch (err) {
      console.error("Error fetching profession ID:", err.message);
      setFormMessage("Kunde inte hitta vald yrkesgrupp.");
    }
  };

  const toggleTech = (techId) => {
    setSelectedTechs((prev) => {
      if (prev.includes(techId)) {
        return prev.filter((id) => id !== techId);
      } else {
        return [...prev, techId];
      }
    });
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

    if (!professionId) {
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
            profession_id: professionId,
          },
        },
      });

      if (authError) throw authError;

      const userId = authData.user.id;

      if (role === "company") {
        const { error: companyError } = await supabase
          .from("companies")
          .insert({
            user_id: userId,
            name: companyName,
          });

        if (companyError) throw companyError;

        const { error: companyProfessionError } = await supabase
          .from("company_professions")
          .insert({
            company_id: userId,
            profession_id: professionId,
          });

        if (companyProfessionError) throw companyProfessionError;
      } else {
        const { error: studentError } = await supabase.from("students").insert({
          user_id: userId,
          name: studentName,
          profession_id: professionId,
          website: website,
        });

        if (studentError) throw studentError;
      }

      if (selectedTechs.length > 0) {
        if (role === "company") {
          const companyTechLinks = selectedTechs.map((techId) => ({
            company_id: userId,
            technology_id: techId,
          }));

          const { error: companyTechError } = await supabase
            .from("company_technologies")
            .insert(companyTechLinks);

          if (companyTechError) throw companyTechError;
        } else {
          const studentTechLinks = selectedTechs.map((techId) => ({
            student_id: userId,
            technology_id: techId,
          }));

          const { error: studentTechError } = await supabase
            .from("student_technologies")
            .insert(studentTechLinks);

          if (studentTechError) throw studentTechError;
        }
      }

      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (signInError) throw signInError;

      setFormMessage("Registrering lyckades! Omdirigerar...");
      router.push("/dashboard");
    } catch (error) {
      console.error("Registration error:", error);
      setFormMessage(
        error.message || "Ett fel uppstod vid registrering. Försök igen senare."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="signup-form" id="signupForm" onSubmit={handleSubmit}>
      <div className="role-toggle">
        <Button
          text="Företag"
          onClick={() => handleRoleChange("company")}
          variant={
            role === "company" ? "block-primary active" : "block-primary"
          }
          type="button"
        />
        <Button
          text="Student"
          onClick={() => handleRoleChange("student")}
          variant={
            role === "student" ? "block-primary active" : "block-primary"
          }
          type="button"
        />
      </div>

      <InputField
        label={role === "company" ? "Företagsnamn*" : "Namn*"}
        type="text"
        value={role === "company" ? companyName : studentName}
        onChange={(e) =>
          role === "company"
            ? setCompanyName(e.target.value)
            : setStudentName(e.target.value)
        }
        placeholder={
          role === "company" ? "Ex. Office AB" : "För- och efternamn"
        }
      />

      <InputField
        label="E-postadress*"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Ex. info@office.com"
      />

      {role === "student" && (
        <InputField
          label="Hemsidan*"
          type="text"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
          placeholder="Webplats till din portfolio eller Github"
        />
      )}

      <p className="form-text">
        När du registrerar dig skapas automatiskt ett konto på vår webbplats.
      </p>

      <InputField
        label="Lösenord*"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Minst 6 tecken"
      />

      <InputField
        label="Bekräfta lösenord*"
        type="password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        placeholder="Upprepa lösenord"
      />

      <div className="profession-wrapper">
        <label htmlFor="profession-web" className="profession-label">
          {role === "company" ? "Vi tar emot*" : "Jag studerar*"}
        </label>
        <div className="profession-toggle">
          <input
            type="radio"
            id="profession-web"
            name="profession"
            value="Webbutvecklare"
            checked={profession === "Webbutvecklare"}
            onChange={() => toggleProfession("Webbutvecklare")}
            className="hidden-radio"
          />
          <FormButton
            text="Webbutvecklare"
            onClick={() => toggleProfession("Webbutvecklare")}
            variant={profession === "Webbutvecklare" ? "role selected" : "role"}
            type="button"
          />

          <input
            type="radio"
            id="profession-design"
            name="profession"
            value="Digital Designer"
            checked={profession === "Digital Designer"}
            onChange={() => toggleProfession("Digital Designer")}
            className="hidden-radio"
          />
          <FormButton
            text="Digital Designer"
            onClick={() => toggleProfession("Digital Designer")}
            variant={
              profession === "Digital Designer" ? "role selected" : "role"
            }
            type="button"
          />
        </div>
      </div>

      {profession && (
        <>
          <div className="tech-picker">
            <label>
              {role === "company" ? "Vi söker:" : "Jag vill gärna jobba med:"}
            </label>
            {technologies.length > 0 ? (
              technologies.map((tech) => (
                <FormButton
                  key={tech.id}
                  text={tech.name}
                  onClick={() => toggleTech(tech.id)}
                  variant={
                    selectedTechs.includes(tech.id) ? "tech selected" : "tech"
                  }
                  type="button"
                />
              ))
            ) : (
              <p>Inga teknologier hittades för denna yrkesgrupp.</p>
            )}
          </div>
        </>
      )}

      <div className="checkbox-wrapper">
        <Checkbox
          checked={isChecked}
          onChange={handleCheckboxChange}
          required
        />
        <label>
          <p>
            Jag godkänner <Link href="/terms"> användarvillkoren</Link>
          </p>
        </label>
      </div>

      <div className="submit-container">
        <Button
          type="submit"
          text="Anmäl nu"
          variant="primary"
          disabled={loading}
        />
      </div>

      {formMessage && <FormMessage message={formMessage} />}
    </form>
  );
}
