"use client";

import { useState, useEffect } from "react";
import "./Navbar.css";
import Link from "next/link";
import Image from "next/image";
import useAuth from "@/hooks/useAuth";

export default function Navbar() {
  const { user, logout } = useAuth();
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const handleScroll = () => {
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
      <div className="nav-links">
        {user ? (
          <>
            <Link href="/dashboard" className="nav-link">
              Deltagare
            </Link>
            <Link href="/event" className="nav-link">
              Eventet
            </Link>
            <Link href="/settings" className="nav-link">
              Inställningar
            </Link>
            <Link href="#" className="nav-link" onClick={logout}>
              Logga ut
            </Link>
          </>
        ) : (
          <Link href="/login" className="login-link">
            Logga in
          </Link>
        )}
      </div>
    </nav>
  );
}
