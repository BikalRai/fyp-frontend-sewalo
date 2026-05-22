import type { IInput } from "@/types/input.types";
import { useState } from "react";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";

const SeInput = ({
  type = "text",
  label,
  name,
  Icon,
  placeholderText,
  registration,
  error,
}: IInput) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const isPassword = type === "password";

  return (
    <div className="grid gap-3">
      <label htmlFor={name} className="font-medium text-text-dark text-sm">
        {label}
      </label>
      <div className="border border-muted/30 p-3 rounded-xl flex items-center gap-2 focus-within:border-muted transition-colors duration-300">
        <span>{Icon && <Icon className="stroke-muted w-4 h-4" />}</span>
        <input
          className="border-0 outline-0 w-full text-sm placeholder:text-muted/50"
          type={isPassword ? (showPassword ? "text" : "password") : type}
          id={name}
          name={name}
          placeholder={placeholderText}
          {...registration}
        />
        {isPassword && (
          <span>
            {showPassword ? (
              <IoEyeOffOutline
                className="cursor-pointer"
                onClick={() => setShowPassword((prev) => !prev)}
              />
            ) : (
              <IoEyeOutline
                className="cursor-pointer"
                onClick={() => setShowPassword((prev) => !prev)}
              />
            )}
          </span>
        )}
      </div>
      {error && <span className="text-danger text-xs">{error}</span>}
    </div>
  );
};

export default SeInput;
