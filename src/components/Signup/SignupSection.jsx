import Button from "../Button/Button";
import SignupForm from "./SignupForm";
import { forwardRef } from "react";

const SignupSection = forwardRef((props, ref) => {
  return (
    <section className="signup-section" id="signup" ref={ref}>
      <div className="form-toggle">
        <Button text="Företag" variant="block-primary" />
        <Button text="Student" variant="block-primary" />
      </div>
      <SignupForm />
    </section>
  );
});

export default SignupSection;
