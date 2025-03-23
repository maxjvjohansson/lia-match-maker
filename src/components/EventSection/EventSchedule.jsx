export default function EventSchedule() {
  const schedule = [
    {
      time: "13:00",
      description:
        "Hälsa Välkomna Presentera företag. Fritt Mingel, studenter visar sina portfolios.",
    },
    {
      time: "14:00",
      description: "Kort presentation av vinnande konceptet för LIA inbjudan.",
    },
    {
      time: "14:15",
      description: "Fritt Mingel fortsätter, studenter visar sina portfolios.",
    },
    { time: "15:00", description: "Avslutning." },
  ];
  return (
    <article className="schedule-list">
      {schedule.map((item, index) => (
        <div key={index} className="schedule-item">
          <span className="time">{item.time}</span>
          <p className="description">{item.description}</p>
        </div>
      ))}
    </article>
  );
}
