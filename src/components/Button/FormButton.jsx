import "./FormButton.css";

export default function FormButton({
  text,
  variant = "role",
  onClick,
  type = "button",
}) {
  const buttonClassName = `form-btn ${variant}`;

  return (
    <button onClick={onClick} className={buttonClassName} type={type}>
      <span>{text}</span>
    </button>
  );
}
