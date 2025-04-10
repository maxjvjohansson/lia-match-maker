"use client";

import CheckedIcon from "@/assets/icons/checked.svg";
import UncheckedIcon from "@/assets/icons/unchecked.svg";
import "./Checkbox.css";

export default function Checkbox({
  label,
  checked = false,
  onChange,
  variant = "default",
}) {
  const handleToggle = () => {
    onChange(!checked);
  };

  return (
    <div className={`custom-checkbox ${variant}`} onClick={handleToggle}>
      {checked ? (
        <CheckedIcon className={`checkbox-icon ${variant}`} />
      ) : (
        <UncheckedIcon className={`checkbox-icon ${variant}`} />
      )}
      {label && <span className={`checkbox-label ${variant}`}>{label}</span>}
    </div>
  );
}
