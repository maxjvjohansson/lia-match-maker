import "./Hero.css";
import Button from "../Button/Button";
import Banner from "../Banner/Banner";
import HeroCircles from "./HeroCircles";
import { useRouter } from "next/navigation";
import EventTime from "../Event/EventTime";
import useAuth from "@/hooks/useAuth";

export default function Hero({ scrollToSignup }) {
  const router = useRouter();
  const { user } = useAuth();

  const handleCompanyClick = () => {
    if (user) {
      router.push("/dashboard?view=company");
    } else {
      scrollToSignup();
    }
  };

  const handleStudentClick = () => {
    if (user) {
      router.push("/dashboard?view=student");
    } else {
      scrollToSignup();
    }
  };

  return (
    <section className="hero">
      <HeroCircles />
      <div className="hero-content">
        <div className="hero-heading">
          <h1 className="title-animation">TRÄFFA DIN</h1>
          <h1>PERFECT MATCH</h1>
          <EventTime />
          <p className="event-info">
            Ett event där du bygger relationer med framtidens kollegor och
            attraherar morgondagens talanger.
          </p>
        </div>

        <div className="hero-cta">
          <p className="signup-text">
            {user ? "Se profiler" : "Anmäl dig som"}
          </p>
          <div className="btn-container">
            <Button
              variant="secondary"
              text="FÖRETAG"
              showArrow
              iconDirection="right"
              iconColor="auto"
              onClick={handleCompanyClick}
            />
            <Button
              variant="primary"
              text="STUDENT"
              showArrow
              iconDirection="right"
              iconColor="auto"
              onClick={handleStudentClick}
            />
          </div>
        </div>
      </div>
      <Banner />
    </section>
  );
}
