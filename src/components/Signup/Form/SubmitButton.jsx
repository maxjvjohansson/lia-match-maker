export default function SubmitButton({ loading, children }) {
    return (
      <button type="submit" disabled={loading}>
        {loading ? "Skickar..." : children}
      </button>
    );
  }
  