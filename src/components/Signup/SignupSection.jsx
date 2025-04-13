import "./SignupSection.css";
import SignupForm from "./SignupForm";
import { forwardRef } from "react";

const SignupSection = forwardRef(({ defaultRole }, ref) => {
  return (
    <section className="signup-section" id="signup" ref={ref}>
      <div className="signup-heading">
        <h2>Kul att du kommer!</h2>
        <p>Det tar mindre än 30s att fylla i.</p>
        <p>
          Har du redan anmält dig? <a href="/login">Logga in</a> här.
        </p>
      </div>
      <SignupForm defaultRole={defaultRole} />
    </section>
  );
});

export default SignupSection;
