"use client";

import { useState, useEffect } from "react";
import "./Navbar.css";
import Link from "next/link";
import Image from "next/image";
import useAuth from "@/hooks/useAuth";
import useMediaQuery from "@/hooks/useMediaQuery";
import { usePathname } from "next/navigation";
import Button from "../Button/Button";

import MenuIcon from "@/assets/icons/menu.svg";
import CloseIcon from "@/assets/icons/x.svg";
import ProfileIcon from "@/assets/icons/profile.svg";
import CalendarIcon from "@/assets/icons/calendar.svg";
import ParticipantsIcon from "@/assets/icons/participants.svg";

export default function Navbar() {
  const { user, logout } = useAuth();
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

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

  const getNavigationLink = () => {
    if (pathname === "/event" || pathname === "/") {
      return { path: "/dashboard", label: "Deltagare" };
    } else if (pathname === "/dashboard") {
      return { path: "/event", label: "Eventet" };
    } else {
      return { path: "/dashboard", label: "Deltagare" };
    }
  };

  const navigationLink = getNavigationLink();

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
          isDesktop ? (
            <>
              <Link href={navigationLink.path} className="nav-link">
                {navigationLink.label}
              </Link>
              <Link href="#" className="nav-link" onClick={logout}>
                Logga ut
              </Link>
              <Link href="/settings" className="nav-link profile-icon">
                <ProfileIcon className="profile-svg" />
              </Link>
            </>
          ) : (
            <>
              <button
                className="hamburger"
                onClick={() => setMenuOpen((prev) => !prev)}
              >
                <span className="menu-text">Meny</span>
                <MenuIcon className="menu-svg" />
              </button>
              {menuOpen && (
                <div className="dropdown-menu">
                  <div className="dropdown-menu-content">
                    <button
                      className="close-menu"
                      onClick={() => setMenuOpen(false)}
                    >
                      <CloseIcon className="close-svg" />
                    </button>
                    <Link href="/event" className="dropdown-link">
                      <CalendarIcon className="dropdown-icon" />
                      Eventet
                    </Link>
                    <Link href="/dashboard" className="dropdown-link">
                      <ParticipantsIcon className="dropdown-icon" />
                      Deltagare
                    </Link>
                    <Link href="/settings" className="dropdown-link">
                      <ProfileIcon className="dropdown-icon" />
                      Profilinställningar
                    </Link>
                    <Button
                      text="Logga ut"
                      variant="secondary"
                      className="dropdown-link"
                      onClick={logout}
                    />
                  </div>
                </div>
              )}
            </>
          )
        ) : (
          <Link href="/login" className="login-link">
            Logga in
          </Link>
        )}
      </div>
    </nav>
  );
}
