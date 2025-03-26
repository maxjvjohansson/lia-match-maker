import "./Button.css";

const iconBasePath = "/assets/icons/";

export default function Button({
  text,
  variant = "primary",
  onClick,
  type = "button",
  showArrow = false,
  iconDirection = "right",
  iconColor = "auto",
}) {
  const isPrimary = variant === "primary";
  const isBlockButton = variant.startsWith("block-");

  const resolvedColor =
    iconColor === "auto" ? (isPrimary ? "white" : "red") : iconColor;

  const getIconPath = () => {
    if (!showArrow) return null;

    if (iconDirection === "right") {
      return resolvedColor === "white"
        ? `${iconBasePath}arrow_up_right_white.svg`
        : `${iconBasePath}arrow_up_right_red.svg`;
    } else {
      return resolvedColor === "white"
        ? `${iconBasePath}arrow_left_white.svg`
        : `${iconBasePath}arrow_left_red.svg`;
    }
  };

  const iconSrc = getIconPath();
  const buttonClassName = isBlockButton ? variant : `btn ${variant}`;

  return (
    <button className={buttonClassName} onClick={onClick} type={type}>
      {iconDirection === "left" && showArrow && iconSrc && (
        <img src={iconSrc} alt="" className="arrow left" />
      )}
      <span>{text}</span>
      {iconDirection === "right" && showArrow && iconSrc && (
        <img src={iconSrc} alt="" className="arrow right" />
      )}
    </button>
  );
}
