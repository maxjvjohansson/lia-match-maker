"use client";

import { useEffect, useRef } from "react";
import "./Banner.css";

const logos = [
  "/assets/images/Forsman.png",
  "/assets/images/Grebban.png",
  "/assets/images/Habermax.png",
  "/assets/images/Halmstad Uni.png",
  "/assets/images/HiQ.png",
  "/assets/images/MK.png",
  "/assets/images/Polestar.png",
  "/assets/images/Raket.png",
  "/assets/images/Stendahls.png",
  "/assets/images/variant.png",
];

export default function Banner() {
  const trackRef = useRef(null);

  useEffect(() => {
    const track = trackRef.current;

    if (!track) return;

    let clone = track.innerHTML;
    track.innerHTML += clone;
    let speed = 1;

    function moveLogos() {
      if (track) {
        track.style.transform = `translateX(-${speed}px)`;
        speed += 0.3;
        if (Math.abs(speed) > track.scrollWidth / 2) {
          track.style.transform = "translateX(0)";
          speed = 1;
        }
        requestAnimationFrame(moveLogos);
      }
    }

    moveLogos();
  }, []);

  return (
    <div className="logo-banner">
      <div className="logo-track" ref={trackRef}>
        {logos.map((logo, index) => (
          <img key={index} src={logo} alt="Partner Logo" className="logo" />
        ))}
      </div>
    </div>
  );
}
