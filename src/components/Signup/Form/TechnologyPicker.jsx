import { useState } from "react";
import Button from "@/components/Button/Button";

const techOptions = [
  { id: 1, name: "React" },
  { id: 2, name: "Vue" },
  { id: 3, name: "Svelte" },
  { id: 4, name: "Node.js" },
];

export default function TechnologyPicker({ selected, onChange }) {
  const toggleTech = (techId) => {
    const newSelection = selected.includes(techId)
      ? selected.filter((id) => id !== techId)
      : [...selected, techId];

    onChange(newSelection);
  };

  return (
    <div className="tech-picker">
      {techOptions.map((tech) => {
        const isSelected = selected.includes(tech.id);

        return (
          <Button
            key={tech.id}
            type="button"
            className={isSelected ? "selected" : ""}
            onClick={() => toggleTech(tech.id)}
          >
            {tech.name}
          </Button>
        );
      })}
    </div>
  );
}
