import Button from "../Button/Button";
import EventSchedule from "./EventSchedule";
import "./EventSection.css";
import EventTime from "./EventTime";
import useAuth from "@/hooks/useAuth";
import { useRouter } from "next/navigation";

export default function EventSection({ scrollToSignup }) {
  const router = useRouter();
  const { user } = useAuth();

  return (
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
        {!user && (
          <Button
            variant="primary"
            showArrow
            text="Häng med!"
            onClick={scrollToSignup}
          />
        )}
      </article>
    </section>
  );
}
