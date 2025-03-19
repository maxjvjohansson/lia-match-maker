"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../supabase/client";
import Button from "@/components/Button/Button";
import "../../styles/pages/signup.css";

export default function TestPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({ name: "", email: "" });
    const [errorMessage, setErrorMessage] = useState("");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { error } = await supabase.from("students_test").insert([
            {
                name: formData.name,
                email: formData.email,
            },
        ]);

        if (error) {
            setErrorMessage(`Error: ${error.message}`);
            console.error(error);
        } else {
            router.push("/confirmation");
        }
    };

    return (
        <section className="signup-container">
            <h1>Anmäl dig</h1>
            <form onSubmit={handleSubmit} className="signup-form">
                <input
                    type="text"
                    name="name"
                    placeholder="Namn"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />
                <input
                    type="email"
                    name="email"
                    placeholder="E-post"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
                <Button type="submit" text="Registrera" />
            </form>
            {errorMessage && <p className="error">{errorMessage}</p>}
        </section>
    );
}
