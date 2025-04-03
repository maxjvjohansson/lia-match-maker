"use client";

import "./Settings.css";
import Button from "../Button/Button";
import UpdateForm from "./UpdateForm";

export default function Settings() {
  return (
    <section className="settings-section">
      <div className="settings-heading">
        <Button
          text="Tillbaka"
          variant="primary"
          showArrow
          iconDirection="left"
        />
        <h1 className="settings-title">PROFIL</h1>
        <h1 className="settings-title-thin">INSTÄLLNINGAR</h1>
        <div className="btn-container-settings">
          <Button text="LOGGA UT" variant="secondary" />
          <Button text="RADERA KONTO" variant="secondary" />
        </div>
      </div>
      <UpdateForm />
    </section>
  );
}
