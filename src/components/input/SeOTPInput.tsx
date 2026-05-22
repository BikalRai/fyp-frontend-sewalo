import {
  useCallback,
  useRef,
  useState,
  type ChangeEvent,
  type KeyboardEvent,
  type ClipboardEvent,
} from "react";

interface IOTPInput {
  length?: number;
  onComplete: (otp: string) => void;
}

const SeOTPInput = ({ length = 6, onComplete }: IOTPInput) => {
  const [values, setValues] = useState<string[]>(Array(length).fill(""));
  const refs = useRef<(HTMLInputElement | null)[]>([]);

  const focusBox = (index: number) => {
    refs.current[Math.max(0, Math.min(index, length - 1))]?.focus();
  };

  const triggerComplete = useCallback(
    (vals: string[]) => {
      const otp = vals.join("");
      if (otp.length === length) onComplete(otp);
    },
    [length, onComplete],
  );

  const handleChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    const digit = e.target.value.replace(/\D/g, "").slice(-1);
    const updated = [...values];
    updated[index] = digit;
    setValues(updated);
    if (digit && index < length - 1) focusBox(index + 1);
    triggerComplete(updated);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace") {
      if (!values[index] && index > 0) {
        const updated = [...values];
        updated[index - 1] = "";
        setValues(updated);
        focusBox(index - 1);
      }
    }
    if (e.key === "ArrowLeft") focusBox(index - 1);
    if (e.key === "ArrowRight") focusBox(index + 1);
  };

  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasted = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, length);
    if (!pasted) return;
    const updated = Array(length).fill("");
    pasted.split("").forEach((char, i) => (updated[i] = char));
    setValues(updated);
    focusBox(Math.min(pasted.length, length - 1));
    triggerComplete(updated);
  };

  const handleFocus = (index: number) => {
    refs.current[index]?.select();
  };

  return (
    <div className="flex gap-3 justify-center">
      {values.map((val, i) => (
        <input
          key={i}
          ref={(el) => {
            refs.current[i] = el;
          }}
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          maxLength={1}
          value={val}
          aria-label={`Digit ${i + 1}`}
          onChange={(e) => handleChange(e, i)}
          onKeyDown={(e) => handleKeyDown(e, i)}
          onPaste={handlePaste}
          onFocus={() => handleFocus(i)}
          className={[
            "w-12 h-14 text-center text-xl font-medium rounded-2xl border bg-white",
            "outline-none transition-all duration-150 caret-transparent",
            "focus:border-[#1a2744] focus:ring-2 focus:ring-[#1a2744]/10",
            val ? "border-[#1a2744] bg-gray-50" : "border-gray-200",
          ]
            .filter(Boolean)
            .join(" ")}
        />
      ))}
    </div>
  );
};

export default SeOTPInput;
