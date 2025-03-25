"use client";

import { useState, useEffect } from "react";
import "./Navbar.css";

export default function Navbar() {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const handleScroll = () => {
    if (window.scrollY > lastScrollY) {
      setIsVisible(false);
    } else {
      setIsVisible(true);
    }
    setLastScrollY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  return (
    <nav className={`navbar ${isVisible ? "show" : "hide"}`}>
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
