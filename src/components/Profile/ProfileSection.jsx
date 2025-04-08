"use client";

import "./ProfileSection.css";
import Button from "../Button/Button";
import Filter from "../Filter/Filter";
import ProfileCard from "./ProfileCard";
import Pagination from "../Pagination/Pagination";
import useProfiles from "@/hooks/useProfiles";
import { useState } from "react";

export default function ProfileSection() {
  const [isStudent, setIsStudent] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const profilesPerPage = 9;

  const { profiles, loading, error } = useProfiles(
    isStudent ? "student" : "company"
  );

  const startIndex = (currentPage - 1) * profilesPerPage;
  const currentProfiles = profiles.slice(
    startIndex,
    startIndex + profilesPerPage
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <section className="profile-section">
      <div className="profile-heading">
        <h1 className="profile-title">{isStudent ? "STUDENT" : "FÖRETAGS"}</h1>
        <h1 className="title-thin">PROFILER</h1>
        <div className="profile-btn-container">
          <Button
            variant={!isStudent ? "primary" : "secondary"}
            text="FÖRETAG"
            onClick={() => {
              setIsStudent(false);
              setCurrentPage(1);
            }}
          />
          <Button
            variant={isStudent ? "primary" : "secondary"}
            text="STUDENTER"
            onClick={() => {
              setIsStudent(true);
              setCurrentPage(1);
            }}
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
        {currentProfiles.map((profile) => (
          <ProfileCard
            key={profile.id}
            profile={profile}
            role={isStudent ? "student" : "company"}
          />
        ))}
      </div>

      {profiles.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalProfiles={profiles.length}
          profilesPerPage={profilesPerPage}
          onPageChange={handlePageChange}
        />
      )}
    </section>
  );
}
