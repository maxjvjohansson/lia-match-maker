import "./Footer.css";

export default function Footer() {
  return (
    <footer>
      <div className="footer-left">
        <img
          src="assets/images/yrgo.svg"
          alt="Yrgo logo"
          className="footer-logo"
        />
        <p className="footer-slogan">
          För dig som vill skaffa dig ett yrke. För dig som vill byta yrke och
          för dig som vill fördjupa dig i ett yrke.
        </p>
        <p className="footer-terms">
          Läs <a href="">användarvillkoren</a>.
        </p>
      </div>
      <div className="footer-right">
        <img
          src="assets/images/gbg_logo.svg"
          alt="Gothenburg logo"
          className="gothenburg-logo"
        />
      </div>
    </footer>
  );
}
