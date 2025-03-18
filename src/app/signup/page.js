import Button from "@/components/Button/Button";
import "../../styles/pages/signup.css";

export default function SignupPage() {
    return (
        <section className="signup-container">
            <h1>Registrera dig</h1>
            <form className="signup-form">
                <input
                    type="text"
                    name="name"
                    placeholder="Namn"
                    required
                />
                <input
                    type="email"
                    name="email"
                    placeholder="E-post"
                    required
                />
                <Button text="Anmäl Dig"/>
            </form>
        </section>
    );
}
