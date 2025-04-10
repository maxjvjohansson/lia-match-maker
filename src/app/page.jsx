"use client";

import Hero from "@/components/Hero/Hero";
import EventSection from "@/components/Event/EventSection";
import SignupSection from "@/components/Signup/SignupSection";
import Footer from "@/components/Footer/Footer";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import useAuth from "@/hooks/useAuth";

export default function HomePage() {
  const router = useRouter();
  const signupRef = useRef(null);
  const { user } = useAuth();

  return (
    <main>
      <Hero
        scrollToSignup={() =>
          signupRef.current?.scrollIntoView({ behavior: "smooth" })
        }
      />
      <EventSection
        scrollToSignup={() =>
          signupRef.current?.scrollIntoView({ behavior: "smooth" })
        }
      />
      {!user && <SignupSection ref={signupRef} id="signup" />}
      <Footer />
    </main>
  );
}
