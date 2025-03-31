import "./ConfirmationConfetti.css";

import { DotLottieReact } from "@lottiefiles/dotlottie-react";

export default function ConfirmationConfetti() {
  return (
    <DotLottieReact
      src="assets/animation/confetti_animation.lottie"
      className="confetti"
      loop
      autoplay
    />
  );
}
