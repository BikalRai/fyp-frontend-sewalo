import SeFooterLink from "./SeFooterLink";
import SeFooterTitle from "./SeFooterTitle";

const links = [
  { name: "About us", path: "/about" },
  { name: "Contact", path: "/contact" },
  { name: "Privacy policy", path: "/privacy" },
  { name: "Terms of service", path: "/terms" },
];

const SeFooterCompany = () => {
  return (
    <div className="flex flex-col gap-4">
      <SeFooterTitle title="Company" />
      <div className="flex flex-col gap-3">
        {links.map((link, i) => (
          <SeFooterLink key={i + 1} name={link.name} path={link.path} />
        ))}
      </div>
    </div>
  );
};

export default SeFooterCompany;
