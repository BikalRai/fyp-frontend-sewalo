import SeFooterLink from "./SeFooterLink";
import SeFooterTitle from "./SeFooterTitle";

const links = [
  { name: "Register as a pro", path: "/register" },
  { name: "Starter plan", path: "/starter" },
  { name: "Pro plan", path: "/pro" },
  { name: "Business plan", path: "/business" },
];

const SeFooterProviders = () => {
  return (
    <div className="flex flex-col gap-4">
      <SeFooterTitle title="For Providers" />
      <div className="flex flex-col gap-3">
        {links.map((link, i) => (
          <SeFooterLink key={i + 1} name={link.name} path={link.path} />
        ))}
      </div>
    </div>
  );
};

export default SeFooterProviders;
