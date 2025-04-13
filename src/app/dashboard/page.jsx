import Footer from "@/components/Footer/Footer";
import ProfileSection from "@/components/Profile/ProfileSection";
import { Suspense } from "react";

export default function DashboardPage() {
  return (
    <main>
      <Suspense fallback={<div>Laddar dashboard...</div>}>
        <ProfileSection />
        <Footer />
      </Suspense>
    </main>
  );
}
