import "./Footer.css";

export default function Footer() {
  return (
    <footer>
      <img
        src="assets/images/yrgo.svg"
        alt="Yrgo logo"
        className="footer-logo"
      ></img>
      <p className="footer-slogan">
        För dig som vill skaffa dig ett yrke. För dig som vill byta yrke och för
        dig som vill fördjupa dig i ett yrke.
      </p>
      <p className="footer-terms">
        Läs <a href="">användarvillkoren</a>
      </p>
      <img
        src="assets/images/gbg_logo.png"
        alt="Gothenburg logo"
        className="gothenburg-logo"
      ></img>
    </footer>
  );
}
