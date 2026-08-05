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
    | "tertiary"
    | "accentLight"
    | "tertiaryAccent"
    | "lightGray";
  size?: "sm" | "md" | "large";
  icon?: React.ReactElement;
  iconPosition?: "left" | "right";
  styleClass?: string;
  className?: string;
}

const variantStlyes = {
  primary: "bg-primary text-light border-primary hover:bg-text-dark",
  accent: "bg-accent text-primary border-accent hover:bg-accent/80",
  accentLight: "bg-accent text-light border-accent hover:bg-accent/80",
  outline:
    "bg-transparent text-primary border-muted hover:bg-primary hover:text-light",
  outlineLight: "bg-transparent text-light border-light hover:bg-light/10",
  tertiary:
    "bg-transparent border-transparent text-text-dark hover:underline active:scale-95",
  tertiaryAccent:
    "bg-transparent border-transparent text-accent hover:underline active:scale-95",
  lightGray: "bg-muted/5 border-transparent text-text-dark hover:bg-light-30",
  danger: "bg-danger text-light border-danger hover:bg-soft-danger",
};

const buttonStyles = {
  sm: "px-3 sm:px-4 py-2 text-xs",
  md: "px-4 sm:px-5 py-2.5 sm:py-3 text-xs sm:text-sm",
  large: "px-5 sm:px-6 py-3 sm:py-4 text-sm sm:text-base",
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
  styleClass,
  className,
}: IButtonProps) => {
  const iconIsLeft = iconPosition === "left";
  return (
    <button
      type={type}
      onClick={clickFunc}
      disabled={disabled}
      className={`${buttonStyles[size]} border rounded-lg font-semibold ${variantStlyes[variant]} flex items-center justify-center gap-1.5 sm:gap-2 active:shadow-lg ${variant === "tertiary" ? "" : "hover:shadow-sm"} transition group cursor-pointer disabled:bg-accent/40 
        disabled:cursor-not-allowed 
        disabled:pointer-events-none 
        disabled:shadow-none
        ${!disabled ? "cursor-pointer" : ""} ${styleClass} ${className}`}
    >
      {iconIsLeft && icon && (
        <span className="shrink-0 group-hover:-translate-x-1 transition-transform duration-300">
          {icon}
        </span>
      )}
      <span className="truncate">{btnText}</span>
      {!iconIsLeft && icon && (
        <span className="shrink-0 group-hover:translate-x-1 transition-transform duration-300">
          {icon}
        </span>
      )}
    </button>
  );
};

export default SeButton;
