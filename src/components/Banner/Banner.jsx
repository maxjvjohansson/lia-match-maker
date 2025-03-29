"use client";

import { useEffect, useRef } from "react";
import "./Banner.css";

const logos = [
  "assets/images/company_logos/forsmanbodenfors.svg",
  "assets/images/company_logos/grebban.svg",
  "assets/images/company_logos/habermax.svg",
  "assets/images/company_logos/halmstad.svg",
  "assets/images/company_logos/hiq.svg",
  "assets/images/company_logos/mkmedia.svg",
  "assets/images/company_logos/polestar.svg",
  "assets/images/company_logos/raket.svg",
  "assets/images/company_logos/stendahls.svg",
  "assets/images/company_logos/variant.svg",
  "assets/images/company_logos/whereismypony.svg",
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
        speed += 0.6;
        if (Math.abs(speed) > track.scrollWidth / 2) {
          track.style.transform = "translateX(0)";
          speed = 2;
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
