import { useState } from "react";
import InputField from "./Form/InputField";
import SubmitButton from "./Form/SubmitButton";
import FormMessage from "./Form/FormMessage";
import useCompanySignup from "@/hooks/useCompanySignup";

export default function SignupForm() {
  const [companyName, setCompanyName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { signup, loading, message, setMessage } = useCompanySignup();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("📝 Form submitted");

    if (password !== confirmPassword) {
      setMessage("❌ Lösenorden matchar inte");
      return;
    }

    const success = await signup({ email, companyName, password });

    if (!success) {
      setMessage("❌ Något gick fel vid registrering.");
    }

    if (success) {
      setCompanyName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
    }
  };

  return (
    <form className="signup-form" onSubmit={handleSubmit} autoComplete="off">
      <InputField
        label="Företagsnamn*"
        type="text"
        value={companyName}
        onChange={(e) => setCompanyName(e.target.value)}
        placeholder="Ex. OfficeAB"
      />
      <InputField
        label="Email*"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="ex. office@gmail.com"
      />
      <InputField
        label="Lösenord*"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Minst 6 tecken"
        autoComplete="new-password"
      />
      <InputField
        label="Bekräfta lösenord*"
        type="password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        placeholder="Upprepa lösenord"
        autoComplete="new-password"
      />
      <SubmitButton loading={loading}>Registrera</SubmitButton>
      <FormMessage message={message} />
    </form>
  );
}
