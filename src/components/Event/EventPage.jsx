import EventSchedule from "./EventSchedule";
import "./EventPage.css";
import EventTime from "./EventTime";
import Button from "../Button/Button";

export default function EventPage() {
  return (
    <section className="event-page-section">
      <div className="event-page-heading">
        <div className="event-title-container">
          <div className="event-back-btn">
            <Button
              text="Tillbaka"
              variant="primary"
              showArrow
              iconDirection="left"
              onClick={() => router.push("/dashboard")}
            />
          </div>
          <h1 className="event-title">EVENT</h1>
        </div>
        <h1 className="event-title-thin">INFO</h1>
      </div>
      <section className="event-section">
        <article className="event-heading">
          <h2 className="title">Hur går det till?</h2>
          <EventTime />
        </article>

        <div className="event-schedule">
          <EventSchedule />
        </div>

        <article className="event-description">
          <p>
            LIA Mingel – ett evenemang som ger FÖRETAG chansen att bygga
            relationer med framtidens kollegor, attrahera morgondagens talanger
            och hjälper STUDENTER att hitta den perfekta praktikplatsen.
          </p>
          <p>Vi bjuder på gott kaffe!</p>
        </article>
      </section>
    </section>
  );
}
