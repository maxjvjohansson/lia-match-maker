export default function InputField({ 
  label, 
  type, 
  value, 
  onChange, 
  placeholder, 
  autoComplete,
  name,
  required = true
}) {
  return (
    <label>
      {label}
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        autoComplete={autoComplete}
        name={name}
      />
    </label>
  );
}