"use client";

import "./Navbar.css";

export default function Navbar() {

    return (
        <nav className="navbar">
            <div className="logo-container">
                <a href="/" className="logo"><span className="title-bold">Mingla</span> by <img src="/assets/images/yrgo.svg"></img></a>
            </div>
            <a href="/login" className="login-link">Logga in</a>
        </nav>
    );
}
