import EventSchedule from "./EventSchedule";

export default function EventSection() {
  return (
    <section className="event-section">
      <div className="event-heading">
        <h2 className="title">Hur går det till?</h2>
        <p>24 April | kl 13 - 15 | Visual Arena Lindholmen</p>
      </div>
      <EventSchedule />
    </section>
  );
}
