import type { ISectionHeading } from "@/types/section.types";

const SeParagraph = ({ title }: ISectionHeading) => {
  return (
    <p className='leading-6 text-muted max-w-117 text-center mx-auto'>
      {title}
    </p>
  );
};

export default SeParagraph;
