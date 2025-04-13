"use client";

import "./ProfileCard.css";
import LinkedInIcon from "@/assets/icons/linkedin.svg";
import GithubIcon from "@/assets/icons/github.svg";
import PortfolioIcon from "@/assets/icons/portfolio.svg";
import MailIcon from "@/assets/icons/mail.svg";
import HeartIcon from "@/assets/icons/heart.svg";
import HeartFilledIcon from "@/assets/icons/heart_red.svg";
import supabase from "@/utils/supabase/client";
import { useState } from "react";

function getLinkIcon(website) {
  if (!website) return null;
  if (website.includes("linkedin.com")) return <LinkedInIcon />;
  if (website.includes("github.com")) return <GithubIcon />;
  return <PortfolioIcon />;
}

export default function ProfileCard({
  profile,
  role,
  favorites = [],
  onLikeToggle,
  user,
}) {
  const isLiked = favorites.includes(profile.id);
  const [loading, setLoading] = useState(false);

  const toggleLike = async (e) => {
    e.stopPropagation();
    if (!user) return;
    setLoading(true);

    const { error } = isLiked
      ? await supabase.from("likes").delete().match({
          user_id: user.id,
          liked_profile_id: profile.id,
          profile_type: role,
        })
      : await supabase.from("likes").insert({
          user_id: user.id,
          liked_profile_id: profile.id,
          profile_type: role,
        });

    if (error) console.error("Error toggling like", error);
    if (onLikeToggle) onLikeToggle();
    setLoading(false);
  };

  return (
    <div className="profile-card">
      <div className="profile-header">
        <h3>{profile.name.toUpperCase()}</h3>
        <div className="profile-icons mobile-icons">
          {getLinkIcon(profile.website) && (
            <a href={profile.website} target="_blank" rel="noopener noreferrer">
              {getLinkIcon(profile.website)}
            </a>
          )}
          {profile.user_id && (
            <a href={`mailto:${profile.email}`}>
              <MailIcon />
            </a>
          )}
          <button
            className="like-button"
            onClick={toggleLike}
            disabled={loading}
          >
            {isLiked ? (
              <HeartFilledIcon />
            ) : (
              <HeartIcon className="heart-icon" />
            )}
          </button>
        </div>
      </div>

      <p className="profile-profession">{profile.profession}</p>

      <div className="profile-icons desktop-icons">
        {getLinkIcon(profile.website) && (
          <a href={profile.website} target="_blank" rel="noopener noreferrer">
            {getLinkIcon(profile.website)}
          </a>
        )}
        {profile.user_id && (
          <a href={`mailto:${profile.email}`}>
            <MailIcon />
          </a>
        )}
        <button className="like-button" onClick={toggleLike} disabled={loading}>
          {isLiked ? <HeartFilledIcon /> : <HeartIcon />}
        </button>
      </div>

      <div className="profile-tech">
        {profile.technologies.map((tech, index) => (
          <span key={index} className="tech-badge">
            {tech.toUpperCase()}
          </span>
        ))}
      </div>
    </div>
  );
}
