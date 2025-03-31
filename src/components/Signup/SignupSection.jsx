import Button from "../Button/Button";
import SignupForm from "./SignupForm";

/**
 * SignupSection Component
 * A container component that wraps the SignupForm with additional UI elements.
 * This component provides the section structure for the signup form and adds
 * redundant role toggle buttons at the section level.
 * 
 * Note: These buttons appear to be redundant since SignupForm also has its own
 * role toggle buttons. Consider removing these or connecting them to the SignupForm
 * state if they should control the same state.
 */
export default function SignupSection() {
  return (
    <section className="signup-section">
      {/* Role toggle buttons at section level */}
      <div className="form-toggle">
        <Button text="Företag" variant="primary" />
        <Button text="Student" variant="secondary" />
      </div>
      
      {/* The actual signup form component */}
      <SignupForm />
    </section>
  );
}