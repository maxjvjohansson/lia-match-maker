"use client";

import "./Settings.css";
import Button from "../Button/Button";
import UpdateForm from "./UpdateForm";
import { useRouter } from "next/navigation";

export default function Settings() {
  const router = useRouter();

  return (
    <section className="settings-section">
      <div className="settings-heading">
        <div className="settings-title-container">
          <div className="settings-back-btn">
            <Button
              text="Tillbaka"
              variant="primary"
              showArrow
              iconDirection="left"
              onClick={() => router.push("/dashboard")}
            />
          </div>
          <h1 className="settings-title">PROFIL</h1>
        </div>
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
