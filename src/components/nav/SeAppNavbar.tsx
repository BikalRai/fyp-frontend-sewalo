import { logo } from "@/uitls/images";
import SeButton from "../button/SeButton";
import { IoCloseOutline, IoMenu } from "react-icons/io5";
import { useEffect, useState } from "react";
import SeContainer from "../container/SeContainer";
import SeNavLink from "./SeNavLink";
import SeMMobileNavLink from "./SeMMobileNavLink";

export interface INavbarProps {
  isOpen: boolean;
  isMenuOpen: boolean;
}

const navLinks = [
  { id: 1, path: "/", name: "Home" },
  { id: 2, path: "/#how-it-works", name: "How It Works" },
  { id: 3, path: "/#features", name: "Features" },
  { id: 4, path: "/#pricing", name: "Pricing" },
  { id: 5, path: "/#faq", name: "FAQ" },
];

const SeAppNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const [scrolled, setScrolled] = useState<boolean>(false);

  const [activeLink, setActiveLink] = useState<string>("/");

  const handleToggleNav = () => {
    setIsMenuOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`px-6 md:px-7 lg:px-8 xxl:px-0 fixed z-50 top-0 w-full ${scrolled ? "bg-light/80 shadow backdrop-blur-sm" : "bg-bg"} transition duration-300`}
    >
      <SeContainer>
        <div className='flex items-center justify-between h-16'>
          <div className='h-7 lg:h-8 cursor-pointer'>
            <img src={logo} alt='Logo' className='w-full h-full' />
          </div>

          <div className='hidden lg:flex items-center md:gap-5 lg:gap-8'>
            {/* {navLinks.map((link) => (
              <NavLink
                key={link.id}
                to={link.path}
                className={({ isActive }) =>
                  `text-sm font-medium text-muted after:content[''] after:block after:mt-2 after:bg-primary after:h-0.5 after:w-0 hover:after:w-full hover:after:transition-all hover:after:duration-300 ${isActive ? "text-primary after:w-full" : ""} `
                }
              >
                {link.name}
              </NavLink>
            ))} */}
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
          <div className='hidden lg:flex items-center gap-3'>
            <SeButton btnText='Log in' variant='outline' />
            <SeButton btnText='Get Started' />
          </div>

          <button
            className='lg:hidden p-1.5 rounded-md text-muted hover:text-primary hover:bg-primary/10 transition-all duration-200 cursor-pointer'
            onClick={handleToggleNav}
          >
            <IoMenu className={`w-7 h-7`} />
          </button>

          {/* mobile menu */}
          <div
            className={`fixed min-h-screen inset-0 z-40 bg-primary/40 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${isMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
          >
            <div className='fixed top-0 z-50 right-0 h-full w-[78vw] max-w-xs bg-light shadow-2xl flex flex-col transition-transform duration-300 ease-in-out lg:hidden'>
              <div className='flex items-center justify-between px-6 py-5 border-b border-muted/20'>
                <div className='h-7 lg:h-8 cursor-pointer'>
                  <img src={logo} alt='Logo' className='w-full h-full' />
                </div>
                <button
                  onClick={handleToggleNav}
                  className='p-1.5 rounded-md text-muted hover:text-primary hover:bg-primary/10 transition-all duration-200 cursor-pointer'
                >
                  <IoCloseOutline className='w-6 h-6' />
                </button>
              </div>
              <div className='flex flex-col px-4 py-6 gap-1 flex-1 overflow-y-auto'>
                {/* {navLinks.map((link) => (
                  <NavLink
                    key={link.id}
                    to={link.path}
                    className={({ isActive }) =>
                      `text-sm rounded-sm p-2 hover:bg-primary hover:text-light transition-colors duration-300 ${isActive ? "bg-primary text-accent font-semibold after:w-full" : "text-muted"}`
                    }
                  >
                    {link.name}
                  </NavLink>
                ))} */}
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
              <div className='px-6 py-6 border-t border-muted/20 flex flex-col gap-3'>
                <SeButton btnText='Log in' variant='outline' />
                <SeButton btnText='Get Started' />
              </div>
            </div>
          </div>
        </div>
      </SeContainer>
    </nav>
  );
};

export default SeAppNavbar;
