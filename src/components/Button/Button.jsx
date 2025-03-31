import "./Button.css";
// import ArrowRight from "@/assets/icons/arrow_up_right.svg?component";
// import ArrowLeft from "@/assets/icons/arrow_left.svg?component";

export default function Button({
  text,
  variant = "primary",
  onClick,
  type = "button",
  showArrow = false,
  iconDirection = "right",
}) {
  const isBlockButton = variant.startsWith("block-");
  const buttonClassName = isBlockButton ? variant : `btn ${variant}`;

  return (
    <button className={buttonClassName} onClick={onClick} type={type}>
      {/* {iconDirection === "left" && showArrow && (
        <ArrowLeft className="arrow left" />
      )} */}
      <span>{text}</span>
      {/* {iconDirection === "right" && showArrow && (
        <ArrowRight className="arrow right" />
      )} */}
    </button>
  );
}
