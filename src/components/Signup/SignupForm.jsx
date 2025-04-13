"use client";

import useSignupForm from "@/hooks/useSignupForm";
import "./SignupForm.css";
import InputField from "./Form/InputField";
import FormMessage from "./Form/FormMessage";
import Button from "@/components/Button/Button";
import FormButton from "../Button/FormButton";
import Link from "next/link";
import Checkbox from "../Checkbox/Checkbox";

export default function SignupForm() {
  const {
    role,
    handleRoleChange,
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
    handleCheckboxChange,
    selectedProfessions,
    selectedProfessionIds,
    visibleTechPickers,
    technologies,
    selectedTechs,
    toggleProfession,
    toggleTech,
    handleSubmit,
    formMessage,
    loading,
    professions,
    MAX_TECH_SELECTIONS,
  } = useSignupForm();

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
        name={role === "company" ? "companyName" : "studentName"}
        id={role === "company" ? "companyName" : "studentName"}
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
        name="email"
        id="email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Ex. info@office.com"
        autoComplete="email"
      />

      {role === "student" && (
        <InputField
          label="Länk*"
          name="website"
          id="website"
          type="text"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
          placeholder="Länk till din portfolio, LinkedIn eller Github"
        />
      )}

      <p className="form-text">
        När du registrerar dig skapas automatiskt ett konto på vår webbplats.
      </p>

      <InputField
        label="Lösenord*"
        name="password"
        id="password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Minst 6 tecken"
      />

      <InputField
        label="Bekräfta lösenord*"
        name="confirmPassword"
        id="confirmPassword"
        type="password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        placeholder="Upprepa lösenord"
      />

      <div className="profession-wrapper">
        <span className="profession-label" id="profession-group-label">
          {role === "company" ? "Vi tar emot*" : "Jag studerar*"}
        </span>
        <div
          className="profession-toggle"
          role="radiogroup"
          aria-labelledby="profession-group-label"
        >
          {professions.map((prof) => (
            <div key={prof.id}>
              <input
                type="radio"
                id={`profession-${prof.id}`}
                name="profession"
                checked={selectedProfessions.includes(prof.name)}
                onChange={() => toggleProfession(prof.name, prof.id)}
                className="hidden-radio"
              />
              <label htmlFor={`profession-${prof.id}`}>
                <FormButton
                  text={prof.name}
                  onClick={() => toggleProfession(prof.name, prof.id)}
                  variant={
                    selectedProfessions.includes(prof.name)
                      ? "role selected"
                      : "role"
                  }
                  type="button"
                />
              </label>
            </div>
          ))}
        </div>
      </div>

      {selectedTechs.length > 0 && (
        <div className="selected-techs-count">
          <p>
            Valda tekniker: {selectedTechs.length}/{MAX_TECH_SELECTIONS}
          </p>
        </div>
      )}

      {visibleTechPickers.map((professionId) => (
        <div key={`tech-picker-${professionId}`} className="tech-picker">
          <label>
            {role === "company"
              ? `Vi söker följande kompetenser (${
                  professions.find((p) => p.id === professionId)?.name
                }):`
              : "Jag vill gärna jobba med:"}
          </label>
          {technologies[professionId] &&
          technologies[professionId].length > 0 ? (
            technologies[professionId].map((tech) => (
              <FormButton
                key={tech.id}
                text={tech.name}
                onClick={() => toggleTech(tech.id, professionId)}
                variant={
                  selectedTechs.some((t) => t.id === tech.id)
                    ? "tech selected"
                    : "tech"
                }
                type="button"
                disabled={
                  !selectedTechs.some((t) => t.id === tech.id) &&
                  selectedTechs.length >= MAX_TECH_SELECTIONS
                }
              />
            ))
          ) : (
            <p>Inga teknologier hittades för denna yrkesgrupp.</p>
          )}
        </div>
      ))}

      <div className="checkbox-wrapper">
        <Checkbox
          checked={isChecked}
          onChange={handleCheckboxChange}
          required
          id="terms"
          label={
            <>
              Jag godkänner <Link href="/terms">användarvillkoren</Link>
            </>
          }
        />
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
