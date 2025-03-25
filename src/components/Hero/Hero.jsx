import "./Hero.css";
import Button from "../Button/Button";
import Banner from "../Banner/Banner";
import HeroCircles from "./HeroCircles";

export default function Hero() {
  return (
    <section className="hero">
      <HeroCircles />
      <div className="hero-content">
        <div className="hero-heading">
          <p className="event-time">23 april 2025 · kl 13 · Lindholmen</p>
          <h1 className="title-animation">TRÄFFA DIN</h1>
          <h1>PERFECT MATCH</h1>
          <p className="event-info">
            Ett event där du möter framtidens arbetsgivare/medarbetare.
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
            />
            <Button
              variant="primary"
              text="Student"
              showArrow
              iconDirection="right"
              iconColor="auto"
            />
          </div>
        </div>
      </div>
      <Banner />
    </section>
  );
}
