import Button from "../Button/Button";
import SignupForm from "./SignupForm";
import { forwardRef } from "react";

const SignupSection = forwardRef((props, ref) => {
  return (
    <section className="signup-section" id="signup" ref={ref}>
      <SignupForm />
    </section>
  );
});

export default SignupSection;
