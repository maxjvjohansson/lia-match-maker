"use client";

import Login from "@/components/Login/Login";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const handleScrollToSignup = () => {
    router.push("/");
  };

  return (
    <main>
      <Login scrollToSignup={handleScrollToSignup} />
    </main>
  );
}
