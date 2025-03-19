import "./Hero.css";
import Button from "../Button/Button";

export default function Hero() {
    return (
        <section className="hero">
            <div className="hero-heading">
                <p className="event-time">23 april 2025 · kl 13 · Lindholmen</p>
                <h1 className="title-animation">TRÄFFA DIN</h1>
                <h1>PERFECT MATCH</h1>
                <p>Ett event där du möter framtidens arbetsgivare/medarbetare.</p>
            </div>
                <div className="hero-cta">
                    <p>Anmäl dig som</p>
                    <div className="btn-container">
                        <Button variant="primary" text="Företag" />
                        <Button variant="secondary" text="Student" />
                    </div>
                </div>
        </section>
    );
}