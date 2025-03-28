import "./Confirmation.css";
import EventTime from "@/components/EventSection/EventTime";
import Button from "@/components/Button/Button";
import { useRouter } from "next/navigation";

export default function Confirmation() {
  const router = useRouter();
  return (
    <section className="confirmation">
      <article className="confirmation-content">
        <h1 className="confirmation-title">Tack för din anmälan!</h1>
        <p className="confirmation-text">
          Du har anmält dig till Mingla med Yrgo. Vi har skickat en bekräfelse
          till din E-postadress. Vi ser fram emot att träffa dig!
        </p>
        <EventTime />
        <Button
          text="Utforska vilka mer som ska delta"
          variant="primary"
          showArrow
          onClick={() => router.push("/dashboard")}
        />
      </article>
    </section>
  );
}
