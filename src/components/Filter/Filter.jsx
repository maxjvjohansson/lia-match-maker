"use client";

import { useState } from "react";
import "./Filter.css";

export default function Filter() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedRoles, setSelectedRoles] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [showFavorites, setShowFavorites] = useState(false);

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  const handleRoleChange = (role) => {
    setSelectedRoles((prev) =>
      prev.includes(role) ? prev.filter((r) => r !== role) : [...prev, role]
    );
  };

  const handleSkillChange = (skill) => {
    setSelectedSkills((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]
    );
  };

  return (
    <div className={`filter-container ${isOpen ? "open" : ""}`}>
      <div className="filter-header" onClick={toggleDropdown}>
        <span>Filter</span>
        <span>{isOpen ? "X" : "V"}</span>
      </div>
      {isOpen && (
        <div className="filter-content">
          <div className="filter-section">
            <h3>SÖKER</h3>
            <label>
              <input
                type="checkbox"
                checked={selectedRoles.includes("Digital designer")}
                onChange={() => handleRoleChange("Digital designer")}
              />
              Digital designer
            </label>
            <label>
              <input
                type="checkbox"
                checked={selectedRoles.includes("Webbutvecklare")}
                onChange={() => handleRoleChange("Webbutvecklare")}
              />
              Webbutvecklare
            </label>
          </div>
          <div className="filter-section">
            <h3>ARBETAR MED</h3>
            {[
              "Figma",
              "Frontend",
              "Branding",
              "Backend",
              "Motion",
              "UX/UI",
            ].map((skill) => (
              <button
                key={skill}
                className={`skill-btn ${
                  selectedSkills.includes(skill) ? "selected" : ""
                }`}
                onClick={() => handleSkillChange(skill)}
              >
                {skill}
              </button>
            ))}
          </div>
          <div className="filter-section">
            <h3>FAVORITER</h3>
            <label>
              <input
                type="checkbox"
                checked={showFavorites}
                onChange={() => setShowFavorites((prev) => !prev)}
              />
              Visa favoriter
            </label>
          </div>
        </div>
      )}
    </div>
  );
}
