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

  const handleHashClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // Extract the ID from the path (e.g., "#pricing" becomes "pricing")
    const targetId = path.split("#")[1];

    // Search the DOM for the section with this ID
    const element = document.getElementById(targetId);

    if (element) {
      // Prevent the default instant jump
      e.preventDefault();

      // Execute a smooth native scroll to the element
      element.scrollIntoView({ behavior: "smooth", block: "start" });

      // Update the URL hash without triggering a page reload
      window.history.pushState({}, "", path);
    }

    // Update active state regardless
    setActiveLink(path);
  };

  if (isHash) {
    return (
      <a
        href={path}
        onClick={handleHashClick}
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
