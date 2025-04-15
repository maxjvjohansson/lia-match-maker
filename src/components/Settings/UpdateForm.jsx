"use client";

import useUpdateForm from "@/hooks/useUpdateForm";
import InputField from "../Signup/Form/InputField";
import FormMessage from "../Signup/Form/FormMessage";
import Button from "@/components/Button/Button";
import FormButton from "../Button/FormButton";
import "./UpdateForm.css";

export default function UpdateForm() {
  const {
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
  } = useUpdateForm();

  return (
    <form className="signup-form" onSubmit={handleSubmit}>
      {role === "student" ? (
        <InputField
          label="Namn*"
          name="studentName"
          id="studentName"
          type="text"
          value={studentName}
          onChange={(e) => setStudentName(e.target.value)}
        />
      ) : (
        <InputField
          label="Företagsnamn*"
          name="companyName"
          id="companyName"
          type="text"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
        />
      )}

      <InputField
        label="E-postadress*"
        name="email"
        id="email"
        type="email"
        value={email}
        disabled
        onChange={() => {}}
      />

      {role === "student" && (
        <InputField
          label="Hemsida/portfolio*"
          name="website"
          id="website"
          type="text"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
        />
      )}

      <InputField
        label="Nuvarande lösenord*"
        name="currentPassword"
        id="currentPassword"
        type="password"
        value={currentPassword}
        placeholder="Fyll i ditt nuvarande lösenord"
        onChange={(e) => setCurrentPassword(e.target.value)}
      />

      <InputField
        label="Nytt lösenord*"
        name="newPassword"
        id="newPassword"
        type="password"
        value={newPassword}
        placeholder="Minst 6 tecken"
        onChange={(e) => setNewPassword(e.target.value)}
      />

      <InputField
        label="Bekräfta nytt lösenord*"
        name="confirmPassword"
        id="confirmPassword"
        type="password"
        value={confirmPassword}
        placeholder="Minst 6 tecken"
        onChange={(e) => setConfirmPassword(e.target.value)}
      />

      <div className="profession-wrapper">
        <span className="profession-label" id="update-profession-group-label">
          {role === "company" ? "Vi tar emot*" : "Jag studerar*"}
        </span>

        <div
          className="profession-toggle"
          role="group"
          aria-labelledby="update-profession-group-label"
        >
          {professions.map((prof) => (
            <FormButton
              key={prof.id}
              text={prof.name}
              onClick={() => toggleProfession(prof.id)}
              variant={
                selectedProfessionIds.includes(prof.id)
                  ? "role selected"
                  : "role"
              }
              type="button"
              aria-pressed={selectedProfessionIds.includes(prof.id)}
            />
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
          {(technologies[professionId] || []).map((tech) => (
            <FormButton
              key={tech.id}
              text={tech.name}
              onClick={() => toggleTech(tech.id, professionId, tech.name)}
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
          ))}
        </div>
      ))}

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
