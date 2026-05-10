import type { FooterTitle } from "@/types/footer.types";

const SeFooterTitle = ({ title }: FooterTitle) => {
  return (
    <h6 className="text-xs font-bold text-light uppercase leading-4">
      {title}
    </h6>
  );
};

export default SeFooterTitle;
