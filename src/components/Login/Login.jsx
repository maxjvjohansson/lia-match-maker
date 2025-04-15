"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Button from "../Button/Button";
import ShowIcon from "@/assets/icons/show_password.svg";
import HideIcon from "@/assets/icons/hide_password.svg";
import supabase from "@/utils/supabase/client";
import "./Login.css";

export default function Login({ scrollToSignup }) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [formMessage, setFormMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showResetModal, setShowResetModal] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [resetMessage, setResetMessage] = useState("");
  const [resetLoading, setResetLoading] = useState(false);

  const handleResetPassword = async () => {
    setResetLoading(true);
    setResetMessage("");

    const { error } = await supabase.auth.resetPasswordForEmail(resetEmail, {
      redirectTo: `${window.location.origin}/reset-password`,
    });

    if (error) {
      setResetMessage("Kunde inte skicka återställningslänk.");
    } else {
      setResetMessage("Länk skickad! Kolla din inkorg.");
    }

    setResetLoading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setFormMessage("");

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw new Error(error.message);

      setFormMessage("Inloggning lyckades! Omdirigerar...");
      router.push("/dashboard");
    } catch (err) {
      console.error("Inloggning misslyckades:", err.message);
      setFormMessage("Inloggning misslyckades: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="login-container" aria-labelledby="login-heading">
      <form
        className="login-form"
        method="post"
        autoComplete="on"
        aria-describedby="login-description"
        onSubmit={handleSubmit}
      >
        <div className="login-heading-wrapper">
          <h1 id="login-heading" className="login-heading">
            Varmt välkomna till
          </h1>

          <div className="login-logos" role="img" aria-label="Mingla med Yrgo">
            <div className="login-mingla">
              <Image
                src="assets/images/logo.svg"
                alt="Mingla logo"
                fill
                style={{ objectFit: "contain" }}
              />
            </div>
            <div className="login-yrgo">
              <Image
                src="assets/images/yrgo.svg"
                alt="Yrgo logo"
                fill
                style={{ objectFit: "contain" }}
              />
            </div>
          </div>
        </div>

        <div className="login-field">
          <label htmlFor="email">E-postadress:</label>
          <input
            type="email"
            id="email"
            name="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="login-field">
          <label htmlFor="password">Lösenord:</label>
          <div className="password-wrapper">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              className="toggle-password"
              aria-label={showPassword ? "Dölj lösenord" : "Visa lösenord"}
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <ShowIcon className="icon" />
              ) : (
                <HideIcon className="icon" />
              )}
            </button>
          </div>
        </div>

        {formMessage && (
          <div className="form-message">
            <p>{formMessage}</p>
          </div>
        )}

        <div className="login-links" id="login-description">
          <p>
            Inget konto? Skapa genom att{" "}
            <Link href="/#signup" onClick={scrollToSignup}>
              anmäla dig{" "}
            </Link>
            till eventet.
          </p>
          <button
            type="button"
            className="forgot-link"
            onClick={() => setShowResetModal(true)}
          >
            Glömt lösenordet?
          </button>
        </div>

        <Button
          text={loading ? "Loggar in..." : "Logga in"}
          variant="primary"
          type="submit"
          disabled={loading}
        />
        {showResetModal && (
          <div className="modal-overlay">
            <div className="modal">
              <h2>Återställ lösenord</h2>
              <p>
                Fyll i din e-postadress så skickar vi en återställningslänk.
              </p>

              <input
                type="email"
                placeholder="Din e-post"
                value={resetEmail}
                onChange={(e) => setResetEmail(e.target.value)}
                required
              />

              {resetMessage && <p className="reset-message">{resetMessage}</p>}

              <div className="modal-actions">
                <button
                  className="reset-send-btn"
                  type="button"
                  onClick={handleResetPassword}
                  disabled={resetLoading}
                >
                  {resetLoading ? "Skickar..." : "Skicka länk"}
                </button>
                <button
                  type="button"
                  className="close-modal"
                  onClick={() => {
                    setShowResetModal(false);
                    setResetEmail("");
                    setResetMessage("");
                  }}
                >
                  Stäng
                </button>
              </div>
            </div>
          </div>
        )}
      </form>
    </section>
  );
}
