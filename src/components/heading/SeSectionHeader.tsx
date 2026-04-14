import type { ISectionHeading } from "@/types/section.types";

const SeSectionHeader = ({ title, variant = "normal" }: ISectionHeading) => {
  return (
    <h2
      className={`${variant === "normal" ? "text-text-dark" : "text-light"} font-bold text-4xl text-center leading-10`}
    >
      {title}
    </h2>
  );
};

export default SeSectionHeader;
