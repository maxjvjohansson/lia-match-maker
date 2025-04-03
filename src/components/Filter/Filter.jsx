"use client";

import "./Filter.css";
import ArrowUp from "@/assets/icons/arrow_up.svg";
import ArrowDown from "@/assets/icons/arrow_down.svg";
import FilterIcon from "@/assets/icons/filter.svg";
import { useState, useEffect } from "react";
import CustomCheckbox from "../Checkbox/Checkbox";
import Checkbox from "../Checkbox/Checkbox";

export default function Filter() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [selectedRoles, setSelectedRoles] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [showFavorites, setShowFavorites] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const desktop = window.innerWidth >= 768;
      setIsDesktop(desktop);
      setIsOpen(desktop);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleDropdown = () => {
    if (!isDesktop) {
      setIsOpen((prev) => !prev);
    }
  };

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
      {!isDesktop && (
        <div className="filter-header" onClick={toggleDropdown}>
          <div className="filter-logo">
            <FilterIcon />
            <span>Filter</span>
          </div>
          {isOpen ? <ArrowUp /> : <ArrowDown />}
        </div>
      )}
      {isOpen && (
        <div className={`filter-content ${isDesktop ? "always-open" : ""}`}>
          <div className="filter-section filter-roles">
            <h3>SÖKER</h3>
            <label>
              <Checkbox
                variant="filter"
                checked={selectedRoles.includes("Digital designer")}
                onChange={() => handleRoleChange("Digital designer")}
              />
              Digital designer
            </label>
            <label>
              <Checkbox
                variant="filter"
                checked={selectedRoles.includes("Webbutvecklare")}
                onChange={() => handleRoleChange("Webbutvecklare")}
              />
              Webbutvecklare
            </label>
          </div>

          <div className="filter-section filter-skills">
            <h3>ARBETAR MED</h3>
            <div className="skills-grid">
              {[
                "FIGMA",
                "FRONTEND",
                "BRANDING",
                "BACKEND",
                "MOTION",
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
          </div>

          <div className="filter-section filter-favorites">
            <h3>FAVORITER</h3>
            <label>
              <CustomCheckbox
                variant="filter"
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
