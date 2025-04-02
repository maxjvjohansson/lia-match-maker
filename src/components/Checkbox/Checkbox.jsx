"use client";

import { useState } from "react";
import CheckedIcon from "@/assets/icons/checked.svg";
import UncheckedIcon from "@/assets/icons/unchecked.svg";
import "./Checkbox.css";

export default function Checkbox({ label, checked, onChange }) {
  const [isChecked, setIsChecked] = useState(checked);

  const handleToggle = () => {
    const newChecked = !isChecked;
    setIsChecked(newChecked);
    onChange(newChecked);
  };

  return (
    <div className="custom-checkbox" onClick={handleToggle}>
      {isChecked ? (
        <CheckedIcon className="checkbox-icon" />
      ) : (
        <UncheckedIcon className="checkbox-icon" />
      )}
      <span className="checkbox-label">{label}</span>
    </div>
  );
}
