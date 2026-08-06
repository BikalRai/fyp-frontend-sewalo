import { Link, useLocation, useNavigate } from "react-router-dom";

export interface ILinkProps {
  path: string;
  name: string;
  activeLink: string;
  setActiveLink: (path: string) => void;
}

// 1. Added transition-colors for the text fade
// 2. Moved after:transition-all and after:duration-300 to the base state (removed hover: prefix)
const baseClass =
  "text-sm font-medium transition-colors duration-300 ease-in-out hover:text-primary " +
  "after:content-[''] after:block after:mt-1 after:bg-primary after:h-[2px] after:w-0 " +
  "after:transition-all after:duration-300 after:ease-in-out hover:after:w-full";

// 3. We use activeClass to override the base text color and after:w-0
const activeClass = "text-primary after:w-full";
const inactiveClass = "text-muted";

const SeNavLink = ({ path, name, activeLink, setActiveLink }: ILinkProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    setActiveLink(path);

    // HOME
    if (path === "/") {
      if (location.pathname === "/") {
        e.preventDefault();

        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      }

      return;
    }

    // SECTION LINKS
    if (path.includes("#")) {
      const targetId = path.split("#")[1];

      // Already on home page
      if (location.pathname === "/") {
        const element = document.getElementById(targetId);

        if (element) {
          e.preventDefault();

          element.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });

          window.history.pushState({}, "", path);
        }

        return;
      }

      // Coming from another page
      e.preventDefault();
      navigate(path);
    }
  };

  const isActive = activeLink === path;

  return (
    <Link
      to={path}
      onClick={handleClick}
      // Apply baseClass, then evaluate if it should get the active or inactive specific classes
      className={`${baseClass} ${isActive ? activeClass : inactiveClass}`}
    >
      {name}
    </Link>
  );
};

export default SeNavLink;
