import type { IInput } from "@/types/input.types";

const SeInput = ({
  type = "text",
  label,
  name,
  Icon,
  placeholderText,
}: IInput) => {
  return (
    <div className="grid gap-3">
      <label htmlFor={name} className="font-medium text-text-dark text-sm">
        {label}
      </label>
      <div className="border border-muted/30 p-3 rounded-xl flex items-center gap-2 focus-within:border-muted transition-colors duration-300">
        <span>{<Icon className="stroke-muted w-4 h-4" />}</span>
        <input
          className="border-0 outline-0 w-full text-sm"
          type={type}
          id={name}
          name={name}
          placeholder={placeholderText}
        />
      </div>
    </div>
  );
};

export default SeInput;
