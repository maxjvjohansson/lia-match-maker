"use client";

import Hero from "@/components/Hero/Hero";
import EventSection from "@/components/Event/EventSection";
import SignupSection from "@/components/Signup/SignupSection";
import Footer from "@/components/Footer/Footer";
import { useRouter } from "next/navigation";
import { useState, useRef } from "react";
import useAuth from "@/hooks/useAuth";

export default function HomePage() {
  const router = useRouter();
  const signupRef = useRef(null);
  const [signupRole, setSignupRole] = useState("company");
  const { user } = useAuth();

  const scrollToSignup = (role) => {
    setSignupRole(role);
    signupRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main>
      <Hero scrollToSignup={scrollToSignup} />
      <EventSection scrollToSignup={scrollToSignup} />
      {!user && (
        <SignupSection ref={signupRef} id="signup" defaultRole={signupRole} />
      )}
      <Footer />
    </main>
  );
}
