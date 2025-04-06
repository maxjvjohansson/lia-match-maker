"use client";

import { useState, useEffect } from "react";
import "./Navbar.css";
import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const handleScroll = () => {
    // Hide navbar when user scrolls at least 50px
    if (window.scrollY > 50) {
      if (window.scrollY > lastScrollY) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
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
      <Link href="/" className="navbar-logo">
        <div className="logo-container">
          <div className="logo-mingla">
            <Image
              src="assets/images/logo.svg"
              alt="Mingla logo"
              fill
              style={{ objectFit: "contain" }}
            />
          </div>
          <div className="logo-yrgo">
            <Image
              src="assets/images/yrgo.svg"
              alt="Yrgo logo"
              fill
              style={{ objectFit: "contain" }}
            />
          </div>
        </div>
      </Link>
      <div className="nav-link">
        <Link href={"/login"} className="login-link">
          Logga in
        </Link>
      </div>
    </nav>
  );
}
