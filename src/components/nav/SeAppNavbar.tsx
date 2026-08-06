import { logo } from "@/uitls/images";
import SeButton from "../button/SeButton";
import { IoCloseOutline, IoMenu } from "react-icons/io5";
import { useEffect, useState } from "react";
import SeContainer from "../container/SeContainer";
import SeNavLink from "./SeNavLink";
import SeMMobileNavLink from "./SeMMobileNavLink";
import { Link, useNavigate, useLocation } from "react-router-dom";

export interface INavbarProps {
  isOpen: boolean;
  isMenuOpen: boolean;
}

const navLinks = [
  { id: 1, path: "/", name: "Home" },
  { id: 2, path: "/#how-it-works", name: "How It Works" },
  { id: 3, path: "/#built-different", name: "Built Different" },
  { id: 4, path: "/#pricing", name: "Pricing" },
  { id: 5, path: "/#faq", name: "FAQ" },
];

const SeAppNavbar = ({
  activeLink,
  setActiveLink,
}: {
  activeLink: string;
  setActiveLink: (path: string) => void;
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [scrolled, setScrolled] = useState<boolean>(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleHomeClick = () => {
    setActiveLink("/");
    setIsMenuOpen(false);

    if (location.pathname !== "/") {
      navigate("/");
      return;
    }

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleToggleNav = () => {
    setIsMenuOpen((prev) => !prev);
  };

  // Close mobile menu on desktop resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setIsMenuOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Navbar background transition on scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);

      // Edge case: If user scrolls all the way back to the absolute top, reset to Home "/"
      if (window.scrollY < 50) {
        setActiveLink("/");
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [setActiveLink]);

  // SCROLLSPY LOGIC: Intersection Observer
  useEffect(() => {
    // 1. Extract the IDs we want to observe (e.g., 'how-it-works', 'built-different')
    const sectionIds = navLinks
      .map((link) => link.path.split("#")[1]) // splits "/#pricing" -> "pricing"
      .filter(Boolean); // removes undefined results (like for the "/" home route)

    // 2. Configure the "Tripwire"
    const observerOptions = {
      root: null, // use the browser viewport
      // The crucial part: This creates an invisible horizontal line 40% down from the top of the screen.
      // A section becomes "active" when it crosses this specific line.
      rootMargin: "-40% 0px -60% 0px",
      threshold: 0, // Trigger as soon as 1 pixel of the element crosses the rootMargin
    };

    // 3. What to do when a section crosses the tripwire
    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Reconstruct the path (e.g., "pricing" -> "/#pricing") and set it active
          setActiveLink(`/#${entry.target.id}`);
        }
      });
    };

    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions,
    );

    // 4. Find the DOM elements and tell the observer to watch them
    // We use setTimeout to ensure the DOM elements in <Home /> have painted before observing
    const timeoutId = setTimeout(() => {
      sectionIds.forEach((id) => {
        const element = document.getElementById(id);
        if (element) observer.observe(element);
      });
    }, 100);

    // 5. Cleanup function to prevent memory leaks when unmounting
    return () => {
      clearTimeout(timeoutId);
      observer.disconnect();
    };
  }, [setActiveLink, location.pathname]); // Re-run if path changes to ensure elements exist

  return (
    <nav
      className={`px-6 md:px-7 lg:px-8 xxl:px-0 fixed z-50 top-0 w-full ${scrolled ? "bg-light/80 shadow backdrop-blur-sm" : "bg-bg"} transition duration-300`}
    >
      <SeContainer>
        <div className="flex items-center justify-between h-16">
          <div className="h-7 lg:h-8 cursor-pointer" onClick={handleHomeClick}>
            <img src={logo} alt="Logo" className="w-full h-full" />
          </div>

          <div className="hidden lg:flex items-center md:gap-5 lg:gap-8">
            {navLinks.map((link) => (
              <SeNavLink
                key={link.id}
                path={link.path}
                name={link.name}
                activeLink={activeLink}
                setActiveLink={setActiveLink}
              />
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-3">
            <Link to={`/auth/login`}>
              <SeButton btnText="Log in" variant="outline" />
            </Link>
            <SeButton
              btnText="Get Started"
              clickFunc={() => navigate("/auth/register")}
            />
          </div>

          <button
            className="lg:hidden p-1.5 rounded-md text-muted hover:text-primary hover:bg-primary/10 transition-all duration-200 cursor-pointer"
            onClick={handleToggleNav}
          >
            <IoMenu className={`w-7 h-7`} />
          </button>

          {/* mobile menu remains unchanged */}
          <div
            className={`fixed min-h-screen inset-0 z-40 bg-primary/40 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${isMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
          >
            <div className="fixed top-0 z-50 right-0 h-full w-[78vw] max-w-xs bg-light shadow-2xl flex flex-col transition-transform duration-300 ease-in-out lg:hidden">
              <div className="flex items-center justify-between px-6 py-5 border-b border-muted/20">
                <div className="h-7 lg:h-8 cursor-pointer">
                  <img src={logo} alt="Logo" className="w-full h-full" />
                </div>
                <button
                  onClick={handleToggleNav}
                  className="p-1.5 rounded-md text-muted hover:text-primary hover:bg-primary/10 transition-all duration-200 cursor-pointer"
                >
                  <IoCloseOutline className="w-6 h-6" />
                </button>
              </div>
              <div className="flex flex-col px-4 py-6 gap-1 flex-1 overflow-y-auto">
                {navLinks.map((link) => (
                  <SeMMobileNavLink
                    key={link.id}
                    path={link.path}
                    name={link.name}
                    activeLink={activeLink}
                    setActiveLink={setActiveLink}
                  />
                ))}
              </div>
              <div className="px-6 py-6 border-t border-muted/20 flex flex-col gap-3">
                <SeButton
                  btnText="Log in"
                  variant="outline"
                  clickFunc={() => navigate("/auth/login")}
                />
                <SeButton
                  btnText="Get Started"
                  clickFunc={() => navigate("/auth/register")}
                />
              </div>
            </div>
          </div>
        </div>
      </SeContainer>
    </nav>
  );
};

export default SeAppNavbar;
