import CheckedIcon from "@/assets/icons/checked.svg";
import UncheckedIcon from "@/assets/icons/unchecked.svg";
import "./Checkbox.css";

export default function Checkbox({
  label,
  checked = false,
  onChange,
  id,
  variant = "default",
}) {
  const handleChange = (e) => {
    onChange(e.target.checked);
  };

  return (
    <div className={`custom-checkbox-wrapper ${variant}`}>
      <input
        type="checkbox"
        id={id}
        checked={checked}
        onChange={handleChange}
        className="visually-hidden-checkbox"
      />
      <label htmlFor={id} className={`custom-checkbox ${variant}`}>
        {checked ? (
          <CheckedIcon className={`checkbox-icon ${variant}`} />
        ) : (
          <UncheckedIcon className={`checkbox-icon ${variant}`} />
        )}
        {label && <span className={`checkbox-label ${variant}`}>{label}</span>}
      </label>
    </div>
  );
}
