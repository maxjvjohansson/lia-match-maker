import "./EventSchedule.css";

export default function EventSchedule() {
  const schedule = [
    {
      time: "13:00:",
      description:
        "Hälsa Välkomna! Fritt Mingel, studenter visar sina portfolios.",
    },
    {
      time: "14:00:",
      description: "Kort presentation av vinnande konceptet för LIA-inbjudan.",
    },
    {
      time: "14:15:",
      description: "Fritt Mingel forsätter, studenter visar sina portfolios.",
    },
    { time: "15:00:", description: "Tack för idag!" },
  ];
  return (
    <article className="schedule-list">
      {schedule.map((item, index) => (
        <div key={index} className="schedule-item">
          <p className="time">{item.time}</p>
          <p className="description">{item.description}</p>
        </div>
      ))}
    </article>
  );
}
