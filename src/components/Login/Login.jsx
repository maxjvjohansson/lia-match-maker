"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Button from "../Button/Button";
import ShowIcon from "@/assets/icons/show_password.svg";
import HideIcon from "@/assets/icons/hide_password.svg";
import "./Login.css";

export default function Login({ scrollToSignup }) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <section className="login-container" aria-labelledby="login-heading">
      <form
        className="login-form"
        method="post"
        autoComplete="on"
        aria-describedby="login-description"
      >
        <div className="login-heading-wrapper">
          <h1 id="login-heading" className="login-heading">
            Varmt välkomna till
          </h1>

          <div className="login-logos" role="img" aria-label="Mingla by Yrgo">
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
                priority
                style={{ objectFit: "contain" }}
              />
            </div>
          </div>
        </div>

        <label htmlFor="email">E-postadress:</label>
        <input
          type="email"
          id="email"
          name="email"
          autoComplete="email"
          required
        />

        <label htmlFor="password">Lösenord:</label>
        <div className="password-wrapper">
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            name="password"
            autoComplete="current-password"
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

        <div className="login-links" id="login-description">
          <p>
            Inget konto? Skapa genom att{" "}
            <Link href="/#signup" onClick={scrollToSignup}>
              anmäla dig{" "}
            </Link>
            till eventet.
          </p>
          <Link href="/reset" className="forgot-link">
            Glömt lösenordet?
          </Link>
        </div>
        <Button text="Logga in" variant="primary" type="submit" />
      </form>
    </section>
  );
}
