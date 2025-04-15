import { useEffect, useState } from "react";
import "./FormMessage.css";

export default function FormMessage({ message }) {
  const [visible, setVisible] = useState(!!message);

  useEffect(() => {
    if (message) {
      setVisible(true);
      const timer = setTimeout(() => {
        setVisible(false);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  if (!visible) return null;

  return (
    <div className="form-toast">
      <p>{message}</p>
      <button
        className="toast-close"
        onClick={() => setVisible(false)}
        aria-label="Stäng"
      >
        &times;
      </button>
    </div>
  );
}
