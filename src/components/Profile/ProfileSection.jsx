"use client";

import "./ProfileSection.css";
import Button from "../Button/Button";
import Filter from "../Filter/Filter";
import ProfileCard from "./ProfileCard";
import useProfiles from "@/hooks/useProfiles";
import { useState } from "react";

export default function ProfileSection() {
  const [isStudent, setIsStudent] = useState(true);

  const { profiles, loading, error } = useProfiles(
    isStudent ? "student" : "company"
  );

  return (
    <section className="profile-section">
      <div className="profile-heading">
        <h1 className="profile-title">{isStudent ? "STUDENT" : "FÖRETAGS"}</h1>
        <h1 className="title-thin">PROFILER</h1>
        <div className="profile-btn-container">
          <Button
            variant={!isStudent ? "primary" : "secondary"}
            text="FÖRETAG"
            onClick={() => setIsStudent(false)}
          />
          <Button
            variant={isStudent ? "primary" : "secondary"}
            text="STUDENTER"
            onClick={() => setIsStudent(true)}
          />
        </div>
      </div>

      <div className="filter-text">
        <h2>Filtrering</h2>
        <p>Använd filtreringen för att hitta din perfect match.</p>
      </div>
      <Filter />

      {loading && <p>Laddar profiler...</p>}
      {error && <p>Kunde inte ladda profiler.</p>}

      <div className="profiles-container">
        {profiles.map((profile) => (
          <ProfileCard
            key={profile.id}
            profile={profile}
            role={isStudent ? "student" : "company"}
          />
        ))}
      </div>
    </section>
  );
}
