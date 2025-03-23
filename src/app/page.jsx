"use client";

import EventSection from "@/components/EventSection/EventSection";
import Hero from "@/components/Hero/Hero";
import SignupSection from "@/components/Signup/SignupSection";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <main>
      <Hero />
      <EventSection />
      <SignupSection />
    </main>
  );
}
