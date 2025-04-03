import { useState } from "react";
import InputField from "../Signup/Form/InputField";
import FormMessage from "../Signup/Form/FormMessage";
import Button from "@/components/Button/Button";
import useSignup from "@/hooks/useSignup";
import useTechnologies from "@/hooks/useTechnologies";
import "./UpdateForm.css";
import FormButton from "../Button/FormButton";
import Checkbox from "../Checkbox/Checkbox";

export default function UpdateForm() {
  // Form state
  const [role, setRole] = useState("company");
  const [profession, setProfession] = useState("");
  const [selectedTechs, setSelectedTechs] = useState([]);
  const [companyName, setCompanyName] = useState("");
  const [studentName, setStudentName] = useState("");
  const [website, setWebsite] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [formMessage, setFormMessage] = useState("");
  const [isChecked, setIsChecked] = useState(false);

  const { signup, loading, message } = useSignup();

  const {
    technologies,
    loading: techLoading,
    error: techError,
  } = useTechnologies(profession);

  const handleRoleChange = (newRole) => {
    setRole(newRole);
    setProfession("");
    setSelectedTechs([]);
    setFormMessage("");
  };

  const toggleProfession = (professionName) => {
    setProfession((prev) => (prev === professionName ? "" : professionName));
  };

  const toggleTech = (techId) => {
    setSelectedTechs((prev) =>
      prev.includes(techId)
        ? prev.filter((id) => id !== techId)
        : [...prev, techId]
    );
  };

  const resetForm = () => {
    setCompanyName("");
    setStudentName("");
    setWebsite("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setProfession("");
    setSelectedTechs([]);
    setFormMessage("");
  };

  const handleCheckboxChange = (value) => {
    setIsChecked(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isChecked) {
      setFormMessage("Du måste godkänna användarvillkoren.");
      return;
    }

    if (
      !email ||
      !password ||
      !confirmPassword ||
      (role === "company" && (!companyName || !profession)) ||
      (role === "student" && (!studentName || !website || !profession))
    ) {
      setFormMessage("Vänligen fyll i alla obligatoriska fält");
      return;
    }

    if (password !== confirmPassword) {
      setFormMessage("Lösenorden matchar inte");
      return;
    }

    if (password.length < 6) {
      setFormMessage("Lösenordet måste vara minst 6 tecken");
      return;
    }

    const formData = {
      role,
      email,
      password,
      name: role === "company" ? companyName : studentName,
      website: role === "student" ? website : null,
      profession,
      technologies: selectedTechs,
      termsAccepted: isChecked,
    };

    try {
      const success = await signup(formData);
      if (success) {
        resetForm();
        setFormMessage(message || "Registrering lyckades!");
      } else {
        setFormMessage(message);
      }
    } catch (error) {
      console.error("Form submission error:", error);
      setFormMessage("Ett tekniskt fel inträffade. Försök igen senare.");
    }
  };

  return (
    <form className="signup-form" id="signupForm" onSubmit={handleSubmit}>
      <div className="role-toggle">
        <Button
          text="Företag"
          onClick={() => handleRoleChange("company")}
          variant="block-primary"
          type="button"
        />
        <Button
          text="Student"
          onClick={() => handleRoleChange("student")}
          variant="block-primary"
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
        name="name"
        autoComplete="autocomplete"
      />

      <InputField
        label="E-postadress*"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Ex. info@office.com"
        name="email"
        autoComplete="autocomplete"
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

      <InputField
        label="Lösenord*"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Minst 6 tecken"
        autoComplete="new-password"
        name="new-password"
      />

      <InputField
        label="Bekräfta lösenord*"
        type="password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        placeholder="Upprepa lösenord"
        autoComplete="new-password"
        name="confirm-password"
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
            value="web"
            checked={profession === "web"}
            onChange={() => toggleProfession("web")}
            className="hidden-radio"
          />
          <FormButton
            text="Webbutvecklare"
            onClick={() => toggleProfession("web")}
            variant={profession === "web" ? "role selected" : "role"}
            type="button"
          />

          <input
            type="radio"
            id="profession-design"
            name="profession"
            value="design"
            checked={profession === "design"}
            onChange={() => toggleProfession("design")}
            className="hidden-radio"
          />
          <FormButton
            text="Digital Designer"
            onClick={() => toggleProfession("design")}
            variant={profession === "design" ? "role selected" : "role"}
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
            {techLoading ? (
              <p>Laddar teknologier...</p>
            ) : technologies.length > 0 ? (
              technologies.map(({ id, name }) => (
                <FormButton
                  key={id}
                  text={name}
                  onClick={() => toggleTech(id)}
                  variant={
                    selectedTechs.includes(id) ? "tech selected" : "tech"
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

      <div className="update-submit-container">
        <Button
          type="submit"
          text="Spara ändringar"
          variant="primary"
          disabled={loading}
        />
      </div>

      {formMessage && <FormMessage message={formMessage} />}
    </form>
  );
}
