"use client";

import Hero from "@/components/Hero/Hero";
import EventSection from "@/components/EventSection/EventSection";
import SignupSection from "@/components/Signup/SignupSection";
import { useRouter } from "next/navigation";
import { useRef } from "react";

export default function Home() {
  const router = useRouter();
  const signupRef = useRef(null);

  return (
    <main>
      <Hero
        scrollToSignup={() =>
          signupRef.current?.scrollIntoView({ behavior: "smooth" })
        }
      />
      <EventSection />
      <SignupSection ref={signupRef} />
    </main>
  );
}
