"use client";

import "./Navbar.css";

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo-container">
        <a href="/" className="logo">
          <img src="/assets/images/logo.svg"></img>
          <img src="/assets/images/yrgo.svg"></img>
        </a>
      </div>
      <div className="nav-link">
        <a href="/login" className="login-link">
          Logga in
        </a>
      </div>
    </nav>
  );
}
