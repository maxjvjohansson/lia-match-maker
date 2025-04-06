export default function FormMessage({ message }) {
    if (!message) return null;
    return <p>{message}</p>;
  }
  