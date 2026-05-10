import type { FooterLink } from "@/types/footer.types";

const SeFooterLink = ({ name, path }: FooterLink) => {
  return (
    <a
      href={path}
      className="text-sm text-muted leading-5 hover:text-light transition-colors duration-300"
    >
      {name}
    </a>
  );
};

export default SeFooterLink;
