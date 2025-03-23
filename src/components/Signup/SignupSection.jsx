import Button from "../Button/Button";
import SignupForm from "./SignupForm";

export default function SignupSection() {
  return (
    <section className="signup-section">
      <div className="form-toggle">
        <Button text="Företag" variant="primary" />
        <Button text="Student" variant="secondary" />
      </div>
      <SignupForm />
    </section>
  );
}
