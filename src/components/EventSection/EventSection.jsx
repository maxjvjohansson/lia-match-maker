import Button from "../Button/Button";
import EventSchedule from "./EventSchedule";
import "./EventSection.css";

export default function EventSection({ scrollToSignup }) {
  return (
    <section className="event-section">
      <article className="event-heading">
        <h2 className="title">Hur går det till?</h2>
        <p>23 april 2025 | kl 13-15 | Visual Arena Lindholmen</p>
      </article>
      <EventSchedule />
      <article className="event-description">
        <p>
          LIA Mingel – ett evenemang som ger FÖRETAG chansen att bygga
          relationer med framtidens kollegor, attrahera morgondagens talanger
          och hjälper STUDENTER att hitta den perfekta praktikplatsen.
        </p>
        <p>Vi bjuder på gott kaffe!</p>

        <Button
          variant="primary"
          showArrow
          text="Häng med!"
          onClick={scrollToSignup}
        />
      </article>
    </section>
  );
}
