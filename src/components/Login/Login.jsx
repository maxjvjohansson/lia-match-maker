"use client";

import Button from "../Button/Button";
import "./Login.css";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <section className="login-container">
      <form className="login-form">
        <h1 className="login-heading">Varmt välkomna till</h1>
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

        <label htmlFor="email">E-Postadress:</label>
        <input type="email" id="email" name="email" required />

        <label htmlFor="password">Lösenord:</label>
        <div className="password-wrapper">
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            name="password"
            required
          />
          <span
            className="toggle-password"
            onClick={() => setShowPassword(!showPassword)}
          ></span>
        </div>

        <Button text="Logga in" variant="primary" />

        <div className="login-links">
          <p>
            Inget konto? Skapa genom att <a href="">anmäla</a> till eventet.
          </p>
          <Link href="/reset" className="forgot-link">
            Glömt lösenordet?
          </Link>
        </div>
      </form>
    </section>
  );
}
