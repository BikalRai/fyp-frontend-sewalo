import SeFooterLink from "./SeFooterLink";
import SeFooterTitle from "./SeFooterTitle";

const links = [
  { name: "How it works", path: "/#how-it-works" },
  { name: "Built Different", path: "/#built-different" },
  { name: "Pricing", path: "/#pricing" },
  { name: "FAQ", path: "/#faq" },
];

const SeFooterPlatform = () => {
  return (
    <div className="flex flex-col gap-4 lg:ms-5">
      <SeFooterTitle title="Platform" />
      <div className="flex flex-col gap-3">
        {links.map((link, i) => (
          <SeFooterLink key={i + 1} name={link.name} path={link.path} />
        ))}
      </div>
    </div>
  );
};

export default SeFooterPlatform;
