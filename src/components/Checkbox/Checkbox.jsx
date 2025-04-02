"use client";

import { useState } from "react";
import CheckedIcon from "@/assets/icons/checked.svg";
import UncheckedIcon from "@/assets/icons/unchecked.svg";
import "./Checkbox.css";

export default function Checkbox({
  label,
  checked,
  onChange,
  variant = "default",
}) {
  const [isChecked, setIsChecked] = useState(checked);

  const handleToggle = () => {
    const newChecked = !isChecked;
    setIsChecked(newChecked);
    onChange(newChecked);
  };

  return (
    <div className={`custom-checkbox ${variant}`} onClick={handleToggle}>
      {isChecked ? (
        <CheckedIcon className={`checkbox-icon ${variant}`} />
      ) : (
        <UncheckedIcon className={`checkbox-icon ${variant}`} />
      )}
      <span className={`checkbox-label ${variant}`}>{label}</span>
    </div>
  );
}
