import Button from "../Button/Button";
import EventSchedule from "./EventSchedule";
import "./EventSection.css";

export default function EventSection() {
  return (
    <section className="event-section">
      <article className="event-heading">
        <h2 className="title">Hur går det till?</h2>
        <p>24 April | kl 13 - 15 | Visual Arena Lindholmen</p>
      </article>
      <EventSchedule />
      <article className="event-description">
        <p>
          LIA Mingla – ett evenemang som hjälper STUDENTER att hitta den
          perfekta praktikplatsen och ger FÖRETAG chansen att bygger relationer
          med framtidens kollegor och attraherar morgondagens talanger. Vi
          bjuder på gott kaffe!
        </p>
        <Button variant="primary" text="Anmäl nu" />
      </article>
    </section>
  );
}
