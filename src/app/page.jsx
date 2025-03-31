"use client";

import Hero from "@/components/Hero/Hero";
import EventSection from "@/components/EventSection/EventSection";
import SignupSection from "@/components/Signup/SignupSection";
import Footer from "@/components/Footer/Footer";
import { useRouter } from "next/navigation";
import { useRef } from "react";

export default function HomePage() {
  const router = useRouter();
  const signupRef = useRef(null);

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
      <SignupSection ref={signupRef} id="signup" />
      <Footer />
    </main>
  );
}
