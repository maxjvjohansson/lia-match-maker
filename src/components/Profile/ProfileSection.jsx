import "./ProfileSection.css";
import Button from "../Button/Button";
import Filter from "../Filter/Filter";

export default function ProfileSection() {
  return (
    <section className="profile-section">
      <div className="profile-heading">
        <h1>STUDENT</h1>
        <h1 className="title-thin">PROFILER</h1>
      </div>
      <div className="profile-btn-container">
        <Button variant="secondary" text="FÖRETAG" />
        <Button variant="primary" text="STUDENTER" />
      </div>
      <div className="filter-text">
        <h2>Filtrering</h2>
        <p>Använd filtreringen för att hitta din perfect match.</p>
      </div>
      <Filter />
    </section>
  );
}
