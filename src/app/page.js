"use client";

import { useRouter } from "next/navigation";
import Button from "../components/Button/Button";
import "../styles/pages/home.css";

export default function Home() {
    const router = useRouter();

    return (
        <section className="home">
            <img src="/assets/images/yrgo.svg" alt="Yrgo Logo" className="logo" />
            <img src="/assets/images/logo.png" alt="Mingla Logo" className="logo" />
            <h1>LIA Tinder Möte</h1>
            <p>Vänligen välj företag eller student</p>
            <div className="btn-container">
                <Button text="Företag" onClick={() => router.push("/signup")} />
                <Button text="Student" onClick={() => router.push("/signup")} />
            </div>
        </section>
    );
}
