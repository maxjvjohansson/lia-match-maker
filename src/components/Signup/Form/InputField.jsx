export default function InputField({
  label,
  type,
  value,
  onChange,
  placeholder,
  autoComplete,
  name,
  id,
  required = true,
}) {
  const inputId = id || name;

  return (
    <div className="input-wrapper">
      {label && (
        <label htmlFor={inputId} className="input-label">
          {label}
        </label>
      )}
      <input
        id={inputId}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        autoComplete={autoComplete}
      />
    </div>
  );
}
