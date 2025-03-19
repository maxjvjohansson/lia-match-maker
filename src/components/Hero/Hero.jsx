import "./Hero.css";
import Button from "../Button/Button";

export default function Hero() {
    return (
        <section className="hero">
            <div className="hero-content">
                <h1 className="title-animation">TRÄFFA DIN</h1>
                <h1>PERFECT MATCH</h1>
                <p>Ett event där du möter framtidens arbetsgivare/medarbetare.</p>
                <div className="hero-buttons">
                    <Button text="Företag" />
                    <Button text="Student" />
                </div>
            </div>
        </section>
    );
}