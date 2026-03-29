import { Link } from "react-router-dom";
import type { ILinkProps } from "./SeNavLink";

const baseClass = `text-sm rounded-sm p-2 hover:bg-primary hover:text-light transition-all duration-300`;

const activeClass = `bg-primary text-accent font-semibold`;

const SeMMobileNavLink = ({
  path,
  name,
  activeLink,
  setActiveLink,
}: ILinkProps) => {
  const isHash = path.includes("#");
  if (isHash) {
    return (
      <a
        href={path}
        onClick={() => setActiveLink(path)}
        className={`${baseClass} ${activeLink === path ? activeClass : ""}`}
      >
        {name}
      </a>
    );
  }

  return (
    <Link
      to={path}
      onClick={() => setActiveLink(path)}
      className={`${baseClass} ${activeLink === path ? activeClass : ""}`}
    >
      {name}
    </Link>
  );
};

export default SeMMobileNavLink;
