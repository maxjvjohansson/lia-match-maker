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
  return (
    <div className="logo-banner">
      <div className="logo-track">
        {[...Array(4)].map((_, groupIndex) =>
          logos.map((logo, index) => (
            <img
              key={`group-${groupIndex}-logo-${index}`}
              src={logo}
              alt="Partner Logo"
              className="partner-logo"
            />
          ))
        )}
      </div>
    </div>
  );
}
