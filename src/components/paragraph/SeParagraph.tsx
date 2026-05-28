import type { ISectionHeading } from "@/types/section.types";

const SeParagraph = ({
  title,
  align = "center",
  className,
}: ISectionHeading) => {
  return (
    <p
      className={`leading-6 text-muted max-w-117 text-${align} mx-${align === "left" ? 0 : "auto"} ${className}`}
    >
      {title}
    </p>
  );
};

export default SeParagraph;
