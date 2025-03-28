import "./Hero.css";
import Button from "../Button/Button";
import Banner from "../Banner/Banner";
import HeroCircles from "./HeroCircles";
import { useRouter } from "next/navigation";
import EventTime from "../EventSection/EventTime";

export default function Hero({ scrollToSignup }) {
  const router = useRouter();
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
          <p className="signup-text">Anmäl dig som</p>
          <div className="btn-container">
            <Button
              variant="secondary"
              text="Företag"
              showArrow
              iconDirection="right"
              iconColor="auto"
              onClick={scrollToSignup}
            />
            <Button
              variant="primary"
              text="Student"
              showArrow
              iconDirection="right"
              iconColor="auto"
              onClick={scrollToSignup}
            />
          </div>
        </div>
      </div>
      <Banner />
    </section>
  );
}
