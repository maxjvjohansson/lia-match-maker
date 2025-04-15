"use client";

import "./Settings.css";
import Button from "../Button/Button";
import UpdateForm from "./UpdateForm";
import { useRouter } from "next/navigation";
import supabase from "@/utils/supabase/client";

export default function Settings() {
  const router = useRouter();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/");
  };

  const handleDeleteAccount = async () => {
    const confirmed = window.confirm(
      "Är du säker på att du vill radera ditt konto? Denna åtgärd går inte att ångra."
    );

    if (!confirmed) return;

    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        console.error("User not logged in");
        return;
      }

      const response = await fetch("/api/delete-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const data = await response.json();

      if (!response.ok) {
        console.error("Delete failed:", data.error);
        return;
      }

      await supabase.auth.signOut();
      router.push("/");
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

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
          <Button text="LOGGA UT" variant="secondary" onClick={handleLogout} />
          <Button
            text="RADERA KONTO"
            variant="secondary"
            onClick={handleDeleteAccount}
          />
        </div>
      </div>
      <UpdateForm />
    </section>
  );
}
