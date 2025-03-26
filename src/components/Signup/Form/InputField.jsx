export default function InputField({ label, type, value, onChange, placeholder }) {
    return (
      <label>
        {label}
        <input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required
        />
      </label>
    );
  }
  