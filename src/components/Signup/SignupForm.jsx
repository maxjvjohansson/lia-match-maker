export default function SignupForm() {
  return (
    <form className="signup-form">
      <label>
        Företagsnamn*
        <input type="text" placeholder="Ex. OfficeAB" />
      </label>
      <label>
        Email*
        <input type="email" placeholder="ex. office@gmail.com" />
      </label>
    </form>
  );
}
