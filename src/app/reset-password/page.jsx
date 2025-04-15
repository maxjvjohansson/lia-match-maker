"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import Button from "@/components/Button/Button";
import ShowIcon from "@/assets/icons/show_password.svg";
import HideIcon from "@/assets/icons/hide_password.svg";
import supabase from "@/utils/supabase/client";
import "../../components/Login/Login.css";

export default function ResetPassword() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [formMessage, setFormMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormMessage("");

    if (newPassword !== confirmPassword) {
      setFormMessage("Lösenorden matchar inte.");
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword,
      });

      if (error) throw error;

      setFormMessage("Lösenordet har uppdaterats. Du kan nu logga in.");
      setTimeout(() => router.push("/"), 2000);
    } catch (error) {
      console.error("Fel vid uppdatering av lösenord:", error.message);
      setFormMessage("Kunde inte uppdatera lösenordet. Försök igen.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="login-container" aria-labelledby="reset-heading">
      <form
        className="login-form"
        onSubmit={handleSubmit}
        aria-describedby="reset-description"
      >
        <div className="login-heading-wrapper">
          <h1 id="reset-heading" className="login-heading">
            Återställ lösenord
          </h1>

          <div className="login-logos">
            <div className="login-mingla">
              <Image
                src="/assets/images/logo.svg"
                alt="Mingla logo"
                fill
                style={{ objectFit: "contain" }}
              />
            </div>
            <div className="login-yrgo">
              <Image
                src="/assets/images/yrgo.svg"
                alt="Yrgo logo"
                fill
                style={{ objectFit: "contain" }}
              />
            </div>
          </div>
        </div>

        <div className="login-field">
          <label htmlFor="newPassword">Nytt lösenord:</label>
          <div className="password-wrapper">
            <input
              type={showPassword ? "text" : "password"}
              id="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Minst 6 tecken"
              required
            />
            <button
              type="button"
              className="toggle-password"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? "Dölj lösenord" : "Visa lösenord"}
            >
              {showPassword ? <ShowIcon /> : <HideIcon />}
            </button>
          </div>
        </div>

        <div className="login-field">
          <label htmlFor="confirmPassword">Bekräfta nytt lösenord:</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Upprepa lösenord"
            required
          />
        </div>

        {formMessage && (
          <div className="form-message">
            <p>{formMessage}</p>
          </div>
        )}

        <Button
          text={loading ? "Sparar..." : "Spara nytt lösenord"}
          variant="primary"
          type="submit"
          disabled={loading}
        />
      </form>
    </section>
  );
}
