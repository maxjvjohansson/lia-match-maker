"use client";

import Button from "../Button/Button";
import "./Login.css";
import { useState } from "react";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <section className="login-container">
      <form className="login-form">
        <h1 className="login-heading">Varmt välkomna till</h1>
        <div className="login-logos">
          <img className="login-mingla" src="assets/images/logo.svg"></img>
          <img className="login-yrgo" src="assets/images/yrgo.svg"></img>
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
          <a href="/reset" className="forgot-link">
            Glömt lösenordet?
          </a>
        </div>
      </form>
    </section>
  );
}
