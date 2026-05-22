import type { ISectionHeading } from "@/types/section.types";

const SeSectionHeader = ({
  title,
  variant = "normal",
  align = "center",
}: ISectionHeading) => {
  return (
    <h1
      className={`${variant === "normal" ? "text-text-dark" : "text-light"} font-bold text-4xl text-${align} leading-10`}
    >
      {title}
    </h1>
  );
};

export default SeSectionHeader;
