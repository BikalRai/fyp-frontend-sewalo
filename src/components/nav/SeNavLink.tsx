import { Link } from "react-router-dom";

export interface ILinkProps {
  path: string;
  name: string;
  activeLink: string;
  setActiveLink: (path: string) => void;
}

const baseClass = `text-sm font-medium text-muted after:content-[''] after:block after:mt-2 after:bg-primary after:h-0.5 after:w-0 hover:after:w-full hover:after:transition-all hover:after:duration-300`;

const activeClass = `text-primary after:w-full`;

const SeNavLink = ({ path, name, activeLink, setActiveLink }: ILinkProps) => {
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

export default SeNavLink;
