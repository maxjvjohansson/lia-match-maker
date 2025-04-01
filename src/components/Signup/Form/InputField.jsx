export default function InputField({
  label,
  type,
  value,
  onChange,
  placeholder,
  autoComplete,
  name,
  required = true,
}) {
  return (
    <div className="input-wrapper">
      <label htmlFor={name} className="input-label">
        {label}
      </label>
      <input
        id={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        autoComplete={autoComplete}
        name={name}
      />
    </div>
  );
}
