"use client";

import "./ProfileSection.css";
import Button from "../Button/Button";
import Filter from "../Filter/Filter";
import ProfileCard from "./ProfileCard";
import Pagination from "../Pagination/Pagination";
import useProfiles from "@/hooks/useProfiles";
import { useState, useEffect, useCallback } from "react";
import useAuth from "@/hooks/useAuth";
import supabase from "@/utils/supabase/client";

export default function ProfileSection() {
  const [isStudent, setIsStudent] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const profilesPerPage = 9;

  const [selectedProfession, setSelectedProfession] = useState(null);
  const [selectedTechnologies, setSelectedTechnologies] = useState([]);
  const [showFavorites, setShowFavorites] = useState(false);
  const [favorites, setFavorites] = useState([]);

  const { profiles, loading, error } = useProfiles(
    isStudent ? "student" : "company"
  );
  const { user } = useAuth();

  const fetchFavorites = useCallback(async () => {
    if (!user) return;
    const { data, error } = await supabase
      .from("likes")
      .select("liked_profile_id")
      .eq("user_id", user.id)
      .eq("profile_type", isStudent ? "student" : "company");

    if (!error) {
      setFavorites(data.map((like) => like.liked_profile_id));
    }
  }, [user, isStudent]);

  useEffect(() => {
    fetchFavorites();
  }, [fetchFavorites]);

  let filteredProfiles = profiles;

  if (selectedTechnologies.length > 0) {
    filteredProfiles = filteredProfiles.filter((profile) =>
      selectedTechnologies.every((tech) => profile.technologies.includes(tech))
    );
  }

  if (showFavorites) {
    filteredProfiles = filteredProfiles.filter((profile) =>
      favorites.includes(profile.id)
    );
  }

  const startIndex = (currentPage - 1) * profilesPerPage;
  const currentProfiles = filteredProfiles.slice(
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

      <Filter
        selectedRole={selectedProfession}
        setSelectedRole={setSelectedProfession}
        selectedSkills={selectedTechnologies}
        setSelectedSkills={setSelectedTechnologies}
        showFavorites={showFavorites}
        setShowFavorites={setShowFavorites}
      />

      {loading && <p>Laddar profiler...</p>}
      {error && <p>Kunde inte ladda profiler.</p>}

      <div className="profiles-container">
        {currentProfiles.map((profile) => (
          <ProfileCard
            key={profile.id}
            profile={profile}
            role={isStudent ? "student" : "company"}
            favorites={favorites}
            onLikeToggle={fetchFavorites}
            user={user}
          />
        ))}
      </div>

      {filteredProfiles.length > profilesPerPage && (
        <Pagination
          currentPage={currentPage}
          totalProfiles={filteredProfiles.length}
          profilesPerPage={profilesPerPage}
          onPageChange={handlePageChange}
        />
      )}
    </section>
  );
}
