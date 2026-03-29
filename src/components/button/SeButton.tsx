export interface IButtonProps {
  type?: "button" | "submit" | "reset";
  btnText: string;
  clickFunc?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  variant?:
    | "primary"
    | "outline"
    | "danger"
    | "accent"
    | "outlineLight"
    | "accentLight";
  size?: "sm" | "md" | "large";
  icon?: React.ReactElement;
  iconPosition?: "left" | "right";
}

const variantStlyes = {
  primary: "bg-primary text-light border-primary hover:bg-text-dark",
  accent: "bg-accent text-primary border-accent hover:bg-accent/80",
  accentLight: "bg-accent text-light border-accent hover:bg-accent/80",
  outline:
    "bg-transparent text-primary border-muted hover:bg-primary hover:text-light",
  outlineLight: "bg-transparent text-light border-light hover:bg-light/10",
  danger: "bg-danger text-light border-danger hover:bg-soft-danger",
};

const buttonStyles = {
  sm: "px-4 py-2 text-xs",
  md: "px-5 py-3 text-sm",
  large: "px-6 py-4 text-base",
};

const SeButton = ({
  type = "submit",
  btnText,
  clickFunc,
  disabled,
  variant = "primary",
  size = "md",
  icon,
  iconPosition,
}: IButtonProps) => {
  const iconIsLeft = iconPosition === "left";
  return (
    <button
      type={type}
      onClick={clickFunc}
      disabled={disabled}
      className={`${buttonStyles[size]} border rounded-lg font-semibold ${variantStlyes[variant]} flex items-center justify-center gap-2 hover:shadow-lg transition cursor-pointer text-xs md:text-sm`}
    >
      {iconIsLeft && icon && <span>{icon}</span>}
      <span>{btnText}</span>
      {!iconIsLeft && icon && <span>{icon}</span>}
    </button>
  );
};

export default SeButton;
