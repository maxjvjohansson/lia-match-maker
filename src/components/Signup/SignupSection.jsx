import Button from "../Button/Button";
import SignupForm from "./SignupForm";

export default function SignupSection() {
  return (
    <section className="signup-section">
      <div className="form-toggle">
        <Button text="Företag" variant="block-primary" />
        <Button text="Student" variant="block-primary" />
      </div>
      <SignupForm />
    </section>
  );
}
