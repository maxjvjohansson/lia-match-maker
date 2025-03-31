import { useState } from "react";
import InputField from "./Form/InputField";
import FormMessage from "./Form/FormMessage";
import Button from "@/components/Button/Button";
import useSignup from "@/hooks/useSignup";
import "./SignupForm.css";

export default function SignupForm() {
  // Form state
  const [role, setRole] = useState("company");
  const [profession, setProfession] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [studentName, setStudentName] = useState("");
  const [website, setWebsite] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [formMessage, setFormMessage] = useState("");
  
  // Get signup hook
  const { signup, loading, message } = useSignup();

  // Handle role change
  const handleRoleChange = (newRole) => {
    setRole(newRole);
    setProfession("");
    setFormMessage("");
  };

  // Reset form
  const resetForm = () => {
    setCompanyName("");
    setStudentName("");
    setWebsite("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setProfession("");
    setFormMessage("");
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted");
    
    // Validate form
    if (!email || !password || !confirmPassword || 
        (role === "company" && !companyName) || 
        (role === "student" && (!studentName || !website || !profession))) {
      setFormMessage("❌ Vänligen fyll i alla obligatoriska fält");
      return;
    }

    if (password !== confirmPassword) {
      setFormMessage("❌ Lösenorden matchar inte");
      return;
    }
    
    if (password.length < 6) {
      setFormMessage("❌ Lösenordet måste vara minst 6 tecken");
      return;
    }

    // Prepare form data (without technologies for now)
    const formData = {
      role,
      email,
      password,
      name: role === "company" ? companyName : studentName,
      website: role === "student" ? website : null,
      profession,
      technologies: [] // Empty array for now
    };

    console.log("Submitting data:", formData);
    
    try {
      const success = await signup(formData);
      if (success) {
        resetForm();
        setFormMessage(message || "✅ Registrering lyckades!");
      } else {
        setFormMessage(message);
      }
    } catch (error) {
      console.error("Form submission error:", error);
      setFormMessage("❌ Ett tekniskt fel inträffade. Försök igen senare.");
    }
  };

  return (
    <form className="signup-form" onSubmit={handleSubmit}>
      <div className="role-toggle">
        <Button
          text="Företag"
          onClick={() => handleRoleChange("company")}
          variant={role === "company" ? "primary" : "secondary"}
          type="button"
        />
        <Button
          text="Student"
          onClick={() => handleRoleChange("student")}
          variant={role === "student" ? "primary" : "secondary"}
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
        placeholder={role === "company" ? "Ex. Office AB" : "För- och efternamn"}
      />

      <InputField
        label="E-postadress*"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Ex. info@office.com"
        name="email"
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

      {role === "student" && (
        <>
          <label>Jag studerar*</label>
          <div className="profession-toggle">
            <Button
              text="Webbutvecklare"
              onClick={() => setProfession("web")}
              variant={profession === "web" ? "primary" : "secondary"}
              type="button"
            />
            <Button
              text="Digital Designer"
              onClick={() => setProfession("design")}
              variant={profession === "design" ? "primary" : "secondary"}
              type="button"
            />
          </div>
        </>
      )}

      <div className="submit-container">
        <Button 
          type="submit" 
          text={loading ? "Registrerar..." : "Anmäl nu"} 
          variant="primary" 
          disabled={loading}
        />
      </div>
      
      {formMessage && <FormMessage message={formMessage} />}
    </form>
  );
}