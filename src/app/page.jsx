"use client";

import EventSection from "@/components/EventSection/EventSection";
import Hero from "@/components/Hero/Hero";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <main>
      <Hero />
      <EventSection />
    </main>
  );
}
