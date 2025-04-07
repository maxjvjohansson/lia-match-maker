"use client";

import { useState, useEffect } from "react";
import "./Navbar.css";
import Link from "next/link";
import Image from "next/image";
import supabase from "@/utils/supabase/client";

export default function Navbar() {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [user, setUser] = useState(null);

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

  useEffect(() => {
    const checkUser = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setUser(session?.user || null);
    };
    checkUser();

    const { data: listener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setUser(session?.user || null);
      }
    );

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      listener.subscription.unsubscribe();
    };
  }, [lastScrollY]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

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
            <Link
              href="#"
              className="login-link" // TODO: BYT KLASSNAMN KANSKE
              onClick={(e) => {
                e.preventDefault();
                handleLogout();
              }}
            >
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
